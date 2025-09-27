const Mantenimiento = require('../models/Mantenimiento');

// @desc    Crear un nuevo registro de mantenimiento
// @route   POST /api/mantenimientos
// @access  Private (Admin)
const createMantenimiento = async (req, res) => {
    const { title, description, type, status, date } = req.body;

    try {
        const nuevoMantenimiento = new Mantenimiento({
            title,
            description,
            type,
            status,
            date
        });

        const mantenimiento = await nuevoMantenimiento.save();
        res.status(201).json(mantenimiento);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Obtener todos los registros de mantenimiento
// @route   GET /api/mantenimientos
// @access  Private
const getMantenimientos = async (req, res) => {
    try {
        const mantenimientos = await Mantenimiento.find().sort({ date: -1 });
        res.json(mantenimientos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Actualizar un registro de mantenimiento
// @route   PUT /api/mantenimientos/:id
// @access  Private (Admin)
const updateMantenimiento = async (req, res) => {
    const { title, description, type, status } = req.body;

    const mantenimientoFields = {};
    if (title) mantenimientoFields.title = title;
    if (description) mantenimientoFields.description = description;
    if (type) mantenimientoFields.type = type;
    if (status) mantenimientoFields.status = status;

    try {
        let mantenimiento = await Mantenimiento.findById(req.params.id);

        if (!mantenimiento) {
            return res.status(404).json({ msg: 'Registro de mantenimiento no encontrado' });
        }

        mantenimiento = await Mantenimiento.findByIdAndUpdate(
            req.params.id,
            { $set: mantenimientoFields },
            { new: true }
        );

        res.json(mantenimiento);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Eliminar un registro de mantenimiento
// @route   DELETE /api/mantenimientos/:id
// @access  Private (Admin)
const deleteMantenimiento = async (req, res) => {
    try {
        let mantenimiento = await Mantenimiento.findById(req.params.id);

        if (!mantenimiento) {
            return res.status(404).json({ msg: 'Registro de mantenimiento no encontrado' });
        }

        await Mantenimiento.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Registro de mantenimiento eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};


module.exports = {
    createMantenimiento,
    getMantenimientos,
    updateMantenimiento,
    deleteMantenimiento
};