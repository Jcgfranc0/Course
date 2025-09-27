const fs = require('fs');
const path = require('path');

// --- Carga manual de variables de entorno ---
const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envFileContent = fs.readFileSync(envPath, 'utf-8');
    envFileContent.split('\n').forEach(line => {
        if (line) {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        }
    });
}
// --- Fin de la carga manual ---

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Conexión a la Base de Datos MongoDB ---
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Conexión a MongoDB establecida con éxito.');
})
.catch(err => {
    console.error('Error al conectar con MongoDB:', err.message);
    process.exit(1);
});

// --- Rutas ---
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/gastos', require('./src/routes/gastoRoutes'));
app.use('/api/mantenimientos', require('./src/routes/mantenimientoRoutes'));
app.use('/api/publicaciones', require('./src/routes/publicacionRoutes'));
app.use('/api/recibos', require('./src/routes/reciboRoutes'));
app.use('/api/upload', require('./src/routes/uploadRoutes'));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('API del sistema de gestión de edificios funcionando.');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});