const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear una nueva instancia de usuario
        user = new User({
            username,
            password,
            role
        });

        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Guardar el usuario en la base de datos
        await user.save();

        // Devolver una respuesta exitosa (sin el token, el usuario debe iniciar sesión después)
        res.status(201).json({ msg: 'Usuario registrado con éxito' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// @desc    Autenticar (login) un usuario y obtener un token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Crear el payload para el JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // Firmar el token y devolverlo al cliente
        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Carga el secreto desde las variables de entorno
            { expiresIn: '1h' }, // El token expira en 1 hora (formato recomendado)
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

module.exports = {
    registerUser,
    loginUser
};