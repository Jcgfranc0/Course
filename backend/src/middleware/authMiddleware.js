const jwt = require('jsonwebtoken');

// Middleware para proteger rutas verificando el token JWT
const protect = (req, res, next) => {
    // Obtener el token del header de la petición
    const token = req.header('x-auth-token');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    try {
        // Verificar el token usando el secreto de las variables de entorno
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Añadir el usuario decodificado (payload) al objeto request
        req.user = decoded.user;
        next(); // Continuar con la ejecución de la ruta
    } catch (err) {
        res.status(401).json({ msg: 'El token no es válido' });
    }
};

// Middleware opcional para verificar si el usuario es administrador
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Acceso denegado, se requiere rol de administrador' });
    }
};


module.exports = { protect, admin };