import mongoose from 'mongoose';
import { Notificacion } from '../domain/notificacion.js';

const notificacionSchema = new mongoose.Schema({
    mensaje: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    fechaAlta: {
        type: Date,
        default: Date.now()
    },
    leida: {
        type: Boolean,
        default: false
    },
    fechaLeida: {
        type: Date
    }
}, {
    timestamps: true,
    collection: 'notificaciones'
});

// Vincular la clase Producto con el schema
notificacionSchema.loadClass(Notificacion);

export const NotificacionModel = mongoose.model('Notificacion', notificacionSchema); 