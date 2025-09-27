const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gastoSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['fijo', 'variable'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    invoiceFile: { // Campo para almacenar la ruta o ID del archivo de la factura
        type: String,
        required: false // Opcional, no todos los gastos tendrán factura digital
    }
}, {
    timestamps: true
});

const Gasto = mongoose.model('Gasto', gastoSchema);

module.exports = Gasto;