const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reciboSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    month: {
        type: Number, // 1-12
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    gastos: [{ // Array con los IDs de los gastos incluidos en este recibo
        type: Schema.Types.ObjectId,
        ref: 'Gasto'
    }],
    isPaid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Evitar que se genere más de un recibo para el mismo usuario en el mismo mes y año
reciboSchema.index({ user: 1, month: 1, year: 1 }, { unique: true });

const Recibo = mongoose.model('Recibo', reciboSchema);

module.exports = Recibo;