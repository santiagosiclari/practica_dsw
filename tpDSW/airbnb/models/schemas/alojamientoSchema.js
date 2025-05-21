import mongoose from 'mongoose';
import { DOLAR_USA, PESO_ARG, REALES} from '../domain/moneda.js';
import { WIFI, PISCINA, MASCOTAS_PERMITIDAS, ESTACIONAMIENTO } from '../domain/caracteristica.js';
import { Alojamiento } from '../domain/alojamiento.js';

const alojamientoSchema = new mongoose.Schema({
    anfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        trim: true
    },
    precioPorNoche: {
        type: Number,
        min: 0
    },
    moneda: {
        type: String,
        trim: true,
        default: 'DOLAR_USA'
    },
    horarioCheckIn:{
        type: Date,
        trim: true
    },
    horarioCheckOut:{
        type: Date,
        trim: true,
    },
    cantHuespedesMax: {
        type: Number,
        min: 1,
        default: 4
    },
    caracteristicas: {
        type: [String],
        enum: ['WIFI', 'PISCINA', 'MASCOTAS_PERMITIDAS', 'ESTACIONAMIENTO'],
        default: []
    },
    fotos: [
        {
        type: String
        }
    ],
    reservas: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserva'
        }
    ]

}, {
    timestamps: true,
    collection: 'alojamientos'
});

// Vincular la clase Producto con el schema
alojamientoSchema.loadClass(Alojamiento);

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);