const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mantenimientoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['preventivo', 'correctivo'],
        required: true
    },
    status: {
        type: String,
        enum: ['pendiente', 'en_progreso', 'completado'],
        default: 'pendiente'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Mantenimiento = mongoose.model('Mantenimiento', mantenimientoSchema);

module.exports = Mantenimiento;