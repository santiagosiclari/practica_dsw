import mongoose from 'mongoose';
import { Usuario } from '../domain/usuario.js';

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    mail: {
        type: String,
        required: true,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    collection: 'usuarios'
});

// Vincular la clase Producto con el schema
usuarioSchema.loadClass(Usuario);

export const UsuarioModel = mongoose.model('Usuario', usuarioSchema); 