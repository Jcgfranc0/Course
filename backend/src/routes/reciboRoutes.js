const express = require('express');
const router = express.Router();
const {
    generateReceipts,
    getMyReceipts,
    getAllReceipts
} = require('../controllers/reciboController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route    POST api/recibos/generate
// @desc     Generar recibos para un mes y año específicos
// @access   Private (Admin)
router.post('/generate', [protect, admin], generateReceipts);

// @route    GET api/recibos/my-receipts
// @desc     Obtener los recibos del usuario logueado
// @access   Private
router.get('/my-receipts', protect, getMyReceipts);

// @route    GET api/recibos
// @desc     Obtener todos los recibos (solo admin)
// @access   Private (Admin)
router.get('/', [protect, admin], getAllReceipts);

// @route    GET api/recibos/:id
// @desc     Obtener un recibo por su ID
// @access   Private
router.get('/:id', protect, require('../controllers/reciboController').getReciboById);


module.exports = router;