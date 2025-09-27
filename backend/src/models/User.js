const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'propietario'],
        default: 'propietario'
    }
}, {
    timestamps: true // Añade automáticamente los campos createdAt y updatedAt
});

const User = mongoose.model('User', userSchema);

module.exports = User;