const Publicacion = require('../models/Publicacion');
const User = require('../models/User');

// @desc    Crear una nueva publicación
// @route   POST /api/publicaciones
// @access  Private (Admin)
const createPublicacion = async (req, res) => {
    const { content } = req.body;

    try {
        const nuevaPublicacion = new Publicacion({
            content,
            author: req.user.id // El ID del autor se obtiene del token verificado por el middleware
        });

        const publicacion = await nuevaPublicacion.save();
        res.status(201).json(publicacion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Obtener todas las publicaciones
// @route   GET /api/publicaciones
// @access  Private
const getPublicaciones = async (req, res) => {
    try {
        // Obtener publicaciones y poblar el campo 'author' con el 'username' del usuario
        const publicaciones = await Publicacion.find()
            .populate('author', 'username') // Trae el username del autor en lugar de solo el ID
            .sort({ createdAt: -1 }); // Ordenar por fecha de creación descendente

        res.json(publicaciones);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

module.exports = {
    createPublicacion,
    getPublicaciones
};