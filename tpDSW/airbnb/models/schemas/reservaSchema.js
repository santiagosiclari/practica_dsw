import mongoose from 'mongoose';
import {Reserva, RECHAZADA, PENDIENTE, CONFIRMADA, CANCELADA, RangoFechas, EstadoReserva} from '../domain/reserva.js';
import {docToUsuario} from './usuarioSchema.js';
import { docToAlojamiento } from './alojamientoSchema.js';

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
    },
    fechaFinal: {
        type: Date,
        required: true,
    },
    fechaAlta: {
        type: Date
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'RECHAZADA'],
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

// Vincular la clase Reserva con el schema
reservaSchema.loadClass(Reserva);

export const ReservaModel = mongoose.model('Reserva', reservaSchema);

// Reserva to DOC
export function reservaToDocument(reserva) {
  return {
    huespedReservador: reserva.huespedReservador,
    alojamiento: reserva.alojamiento,
    cantHuespedes: reserva.cantHuespedes,
    fechaInicio: reserva.getRangoFechaInicio(),
    fechaFinal: reserva.getRangoFechaFinal(),
    fechaAlta: reserva.fechaAlta,
    estado: reserva.estado,
    precioPorNoche: reserva.precioPorNoche
  };
}

// Reserva from Doc
function estadoDesdeNombre(nombre) {
  switch (nombre) {
    case 'PENDIENTE': return EstadoReserva.PENDIENTE;
    case 'CONFIRMADA': return EstadoReserva.CONFIRMADA;
    case 'CANCELADA': return EstadoReserva.CANCELADA;
    case 'RECHAZADA': return EstadoReserva.RECHAZADA
    default: throw new Error('Estado desconocido: ' + nombre);
  }
}

export function docToReserva(doc) {
    if (!doc) return undefined;

    const rango = new RangoFechas(doc.fechaInicio, doc.fechaFinal);

    const huesped = typeof doc.huespedReservador?.getNombre === 'function'
        ? doc.huespedReservador
        : docToUsuario(doc.huespedReservador);

    const alojamiento = typeof doc.alojamiento?.getNombre === 'function'
        ? doc.alojamiento
        : docToAlojamiento(doc.alojamiento);

    const reserva = new Reserva(huesped, doc.cantHuespedes, alojamiento, rango, doc.fechaAlta);
    reserva.estado = doc.estado;
    reserva.precioPorNoche = doc.precioPorNoche;
    reserva.setId(doc._id);

    return reserva;
}