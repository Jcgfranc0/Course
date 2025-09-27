const express = require('express');
const router = express.Router();
const {
    createPublicacion,
    getPublicaciones
} = require('../controllers/publicacionController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route    POST api/publicaciones
// @desc     Crear una nueva publicación
// @access   Private (Admin)
router.post('/', [protect, admin], createPublicacion);

// @route    GET api/publicaciones
// @desc     Obtener todas las publicaciones
// @access   Private
router.get('/', protect, getPublicaciones);

module.exports = router;