import mongoose from 'mongoose';
import { Reserva , PENDIENTE, CONFIRMADA, CANCELADA } from '../domain/reserva.js';

const reservaSchema = new mongoose.Schema({
    huespedReservador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Alojamiento'
    },
    cantHuespedes: {
        type: Number,
        required: true,
        min: 1
    },
    fechaInicio: {
        type: Date,
        required: true,
        trim: true,
    },
    fechaFinal: {
        type: Date,
        required: true,
        trim: true,
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'],
        default: 'PENDIENTE'
    },
    precioPorNoche: {
        type: Number,
        default: 1,
        min: 0
    }
}, {
    timestamps: true,
    collection: 'reservas'
});

// Vincular la clase Producto con el schema
reservaSchema.loadClass(Reserva);

export const ReservaModel = mongoose.model('Reserva', reservaSchema); 