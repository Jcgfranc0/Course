require('dotenv').config(); // Carga las variables de entorno desde .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Habilita CORS para permitir la comunicación con el frontend
app.use(express.json()); // Permite al servidor entender y procesar datos en formato JSON

// --- Conexión a la Base de Datos MongoDB ---
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Conexión a MongoDB establecida con éxito.');
})
.catch(err => {
    console.error('Error al conectar con MongoDB:', err.message);
    process.exit(1); // Detiene la aplicación si no se puede conectar a la base de datos
});

// --- Rutas ---
// Se define un prefijo para todas las rutas
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/gastos', require('./src/routes/gastoRoutes'));
app.use('/api/mantenimientos', require('./src/routes/mantenimientoRoutes'));
app.use('/api/publicaciones', require('./src/routes/publicacionRoutes'));
app.use('/api/upload', require('./src/routes/uploadRoutes'));

// Servir archivos estáticos de la carpeta 'uploads'
// Esto hace que los archivos en /backend/uploads sean accesibles desde la URL /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
    res.send('API del sistema de gestión de edificios funcionando.');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});