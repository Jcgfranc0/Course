const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicacionSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencia al usuario que creó la publicación
        required: true
    }
}, {
    timestamps: true
});

const Publicacion = mongoose.model('Publicacion', publicacionSchema);

module.exports = Publicacion;