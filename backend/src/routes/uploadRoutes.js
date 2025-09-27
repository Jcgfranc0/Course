const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// --- Configuración de Multer ---
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // El directorio donde se guardarán los archivos
    },
    filename(req, file, cb) {
        // Genera un nombre de archivo único para evitar colisiones
        // Formato: nombreoriginal-timestamp.extension
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Función para validar el tipo de archivo (opcional, pero recomendado)
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: ¡Solo se admiten imágenes (jpg, jpeg, png) y PDF!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// --- Definición de la Ruta ---
// @route   POST /api/upload
// @desc    Subir un archivo (protegido para administradores)
// @access  Private (Admin)
router.post('/', [protect, admin], upload.single('file'), (req, res) => {
    // Si el middleware de multer se ejecuta correctamente, el archivo está en req.file
    if (!req.file) {
        return res.status(400).send('No se ha subido ningún archivo.');
    }

    // Devolvemos la ruta del archivo para que el frontend pueda usarla
    // Importante: La ruta debe ser accesible públicamente por el frontend
    res.send({
        message: 'Archivo subido con éxito',
        filePath: `/${req.file.path.replace(/\\/g, "/")}` // Normaliza la ruta para que funcione en diferentes SO
    });
});

module.exports = router;