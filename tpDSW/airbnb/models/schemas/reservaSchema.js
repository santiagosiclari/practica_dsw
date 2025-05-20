import mongoose from 'mongoose';
import { Reserva } from '../domain/reserva.js';

const reservaSchema = new mongoose.Schema({
    huespedReservador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    cantHuespedes: {
        type: Number,
        required: true,
        min: 1
    },
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'Alojamiento'
    },
    fechaInicio: {
        type: String,
        required: true,
        trim: true,
    },
    fechaFinal: {
        type: String,
        required: true,
        trim: true,
    },
    estado: {
        type: String
    },
    precioPorNoche: {
        type: Number,
        min: 0
    }
}, {
    timestamps: true,
    collection: 'reservas'
});

// Vincular la clase Producto con el schema
reservaSchema.loadClass(Reserva);

export const ReservaModel = mongoose.model('Reserva', reservaSchema); 