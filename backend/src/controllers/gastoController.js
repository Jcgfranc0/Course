const Gasto = require('../models/Gasto');

// @desc    Crear un nuevo gasto
// @route   POST /api/gastos
// @access  Private (Admin)
const createGasto = async (req, res) => {
    const { description, amount, type, date, invoiceFile } = req.body;

    try {
        const nuevoGasto = new Gasto({
            description,
            amount,
            type,
            date,
            invoiceFile
        });

        const gasto = await nuevoGasto.save();
        res.status(201).json(gasto);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Obtener todos los gastos
// @route   GET /api/gastos
// @access  Private
const getGastos = async (req, res) => {
    try {
        const gastos = await Gasto.find().sort({ date: -1 }); // Ordenar por fecha descendente
        res.json(gastos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Actualizar un gasto
// @route   PUT /api/gastos/:id
// @access  Private (Admin)
const updateGasto = async (req, res) => {
    const { description, amount, type, date, invoiceFile } = req.body;

    // Construir el objeto con los campos a actualizar
    const gastoFields = {};
    if (description) gastoFields.description = description;
    if (amount) gastoFields.amount = amount;
    if (type) gastoFields.type = type;
    if (date) gastoFields.date = date;
    if (invoiceFile) gastoFields.invoiceFile = invoiceFile;

    try {
        let gasto = await Gasto.findById(req.params.id);

        if (!gasto) {
            return res.status(404).json({ msg: 'Gasto no encontrado' });
        }

        gasto = await Gasto.findByIdAndUpdate(
            req.params.id,
            { $set: gastoFields },
            { new: true } // Devuelve el documento modificado
        );

        res.json(gasto);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Eliminar un gasto
// @route   DELETE /api/gastos/:id
// @access  Private (Admin)
const deleteGasto = async (req, res) => {
    try {
        let gasto = await Gasto.findById(req.params.id);

        if (!gasto) {
            return res.status(404).json({ msg: 'Gasto no encontrado' });
        }

        await Gasto.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Gasto eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};


module.exports = {
    createGasto,
    getGastos,
    updateGasto,
    deleteGasto
};