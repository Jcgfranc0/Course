const express = require('express');
const router = express.Router();
const {
    createMantenimiento,
    getMantenimientos,
    updateMantenimiento,
    deleteMantenimiento
} = require('../controllers/mantenimientoController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route    POST api/mantenimientos
// @desc     Crear un nuevo registro de mantenimiento
// @access   Private (Admin)
router.post('/', [protect, admin], createMantenimiento);

// @route    GET api/mantenimientos
// @desc     Obtener todos los registros de mantenimiento
// @access   Private
router.get('/', protect, getMantenimientos);

// @route    PUT api/mantenimientos/:id
// @desc     Actualizar un registro de mantenimiento
// @access   Private (Admin)
router.put('/:id', [protect, admin], updateMantenimiento);

// @route    DELETE api/mantenimientos/:id
// @desc     Eliminar un registro de mantenimiento
// @access   Private (Admin)
router.delete('/:id', [protect, admin], deleteMantenimiento);

module.exports = router;