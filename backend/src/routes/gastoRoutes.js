const express = require('express');
const router = express.Router();
const {
    createGasto,
    getGastos,
    updateGasto,
    deleteGasto
} = require('../controllers/gastoController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route    POST api/gastos
// @desc     Crear un nuevo gasto
// @access   Private (Admin)
router.post('/', [protect, admin], createGasto);

// @route    GET api/gastos
// @desc     Obtener todos los gastos
// @access   Private
router.get('/', protect, getGastos);

// @route    PUT api/gastos/:id
// @desc     Actualizar un gasto
// @access   Private (Admin)
router.put('/:id', [protect, admin], updateGasto);

// @route    DELETE api/gastos/:id
// @desc     Eliminar un gasto
// @access   Private (Admin)
router.delete('/:id', [protect, admin], deleteGasto);

module.exports = router;