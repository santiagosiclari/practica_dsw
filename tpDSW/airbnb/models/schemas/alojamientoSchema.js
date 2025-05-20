import mongoose from 'mongoose';
import { Alojamiento } from '../domain/alojamiento.js';

const alojamientoSchema = new mongoose.Schema({
    anfitrion: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    cantHuespedesMax: {
        type: Number,
        min: 1
    },
    descripcion:{
        type: String,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    moneda: {
        type: String,
        trim: true,
    },
    horarioCheckIn:{
        type: String,
        trim: true,
    },
    horarioCheckOut:{
        type: String,
        trim: true,
    },
    estado: {
        type: String
    },
    precioPorNoche: {
        type: Number,
        min: 0
    },
    caracteristicas: [
        {
        type: String
        }
    ],
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