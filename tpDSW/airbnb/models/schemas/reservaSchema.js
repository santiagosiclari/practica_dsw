import mongoose from 'mongoose';
import {Reserva, PENDIENTE, CONFIRMADA, CANCELADA, RangoFechas, EstadoReserva} from '../domain/reserva.js';

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
    default: throw new Error('Estado desconocido: ' + nombre);
  }
}

export function docToReserva(doc) {
  const rango = new RangoFechas(doc.fechaInicio, doc.fechaFinal);
  const reserva = new Reserva(doc.huespedReservador, doc.cantHuespedes, doc.alojamiento, rango, doc.fechaAlta);
  reserva.estado = doc.estado;
  reserva.precioPorNoche = doc.precioPorNoche;
  reserva.setId(doc._id);

  return reserva;
}