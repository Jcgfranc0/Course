const Recibo = require('../models/Recibo');
const Gasto = require('../models/Gasto');
const User = require('../models/User');

// @desc    Generar recibos para todos los propietarios para un mes y año específicos
// @route   POST /api/recibos/generate
// @access  Private (Admin)
const generateReceipts = async (req, res) => {
    const { month, year } = req.body; // mes (1-12), año (ej. 2023)

    if (!month || !year) {
        return res.status(400).json({ msg: 'Por favor, especifique el mes y el año.' });
    }

    try {
        // 1. Encontrar todos los gastos para el mes y año dados
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59); // Último día del mes

        const gastosDelMes = await Gasto.find({
            date: { $gte: startDate, $lte: endDate }
        });

        if (gastosDelMes.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron gastos para el período especificado.' });
        }

        const gastoIds = gastosDelMes.map(g => g._id);
        const totalGastos = gastosDelMes.reduce((acc, gasto) => acc + gasto.amount, 0);

        // 2. Encontrar todos los usuarios que son propietarios
        const propietarios = await User.find({ role: 'propietario' });

        if (propietarios.length === 0) {
            return res.status(404).json({ msg: 'No hay propietarios registrados para asignarles recibos.' });
        }

        // 3. Calcular el monto prorrateado
        const proratedAmount = totalGastos / propietarios.length;

        // 4. Crear un recibo para cada propietario
        const recibosPromises = propietarios.map(async (propietario) => {
            const reciboData = {
                user: propietario._id,
                month,
                year,
                totalAmount: proratedAmount,
                gastos: gastoIds
            };
            // Usamos findOneAndUpdate con 'upsert: true' para crear o actualizar.
            // Esto evita duplicados si se vuelve a ejecutar la generación para el mismo mes.
            return Recibo.findOneAndUpdate(
                { user: propietario._id, month, year },
                reciboData,
                { new: true, upsert: true } // 'new' devuelve el doc actualizado, 'upsert' lo crea si no existe
            );
        });

        await Promise.all(recibosPromises);

        res.status(201).json({ msg: `Se generaron ${propietarios.length} recibos para ${month}/${year} con un monto de S/ ${proratedAmount.toFixed(2)} cada uno.` });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Obtener los recibos del usuario autenticado
// @route   GET /api/recibos/my-receipts
// @access  Private (Propietario)
const getMyReceipts = async (req, res) => {
    try {
        const recibos = await Recibo.find({ user: req.user.id }).sort({ year: -1, month: -1 });
        res.json(recibos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Obtener todos los recibos (para el admin)
// @route   GET /api/recibos
// @access  Private (Admin)
const getAllReceipts = async (req, res) => {
    try {
        const recibos = await Recibo.find({}).populate('user', 'username').sort({ year: -1, month: -1 });
        res.json(recibos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};


// @desc    Obtener un recibo por su ID
// @route   GET /api/recibos/:id
// @access  Private
const getReciboById = async (req, res) => {
    try {
        const recibo = await Recibo.findById(req.params.id)
            .populate('user', 'username') // Trae el nombre del usuario
            .populate('gastos'); // Trae todos los detalles de los gastos asociados

        if (!recibo) {
            return res.status(404).json({ msg: 'Recibo no encontrado' });
        }

        // Medida de seguridad: Asegurarse de que el propietario solo pueda ver sus propios recibos
        // Los administradores pueden ver cualquiera
        if (req.user.role !== 'admin' && recibo.user._id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        res.json(recibo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

module.exports = {
    generateReceipts,
    getMyReceipts,
    getAllReceipts,
    getReciboById,
};