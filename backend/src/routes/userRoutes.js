const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// @route    POST api/users/register
// @desc     Registrar un nuevo usuario
// @access   Public
router.post('/register', registerUser);

// @route    POST api/users/login
// @desc     Autenticar un usuario y obtener token
// @access   Public
router.post('/login', loginUser);

module.exports = router;