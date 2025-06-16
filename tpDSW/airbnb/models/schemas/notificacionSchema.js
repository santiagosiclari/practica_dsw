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

// Vincular la clase Notificacion con el schema
notificacionSchema.loadClass(Notificacion);

export const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);

export function notificacionToDocument(notificacion){
    return {
        mensaje : notificacion.mensaje,
        usuario : notificacion.usuario,
        fechaAlta : notificacion.fechaAlta,
        leida : notificacion.leida,
        fechaLeida : notificacion.fechaLeida,
    }
}

export function docToNotificacion(doc){
    const notificacion = new Notificacion(doc.mensaje, doc.usuario);
    notificacion.fechaAlta = doc.fechaAlta;
    notificacion.leida = doc.leida;
    notificacion.fechaLeida = doc.fechaLeida;
    notificacion.setId(doc._id);
    return notificacion;
}