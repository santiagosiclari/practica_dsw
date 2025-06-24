import mongoose from 'mongoose';
import { DOLAR_USA, PESO_ARG, REALES} from '../domain/moneda.js';
import { WIFI, PISCINA, MASCOTAS_PERMITIDAS, ESTACIONAMIENTO } from '../domain/caracteristica.js';
import { Alojamiento } from '../domain/alojamiento.js';
import { docToReserva } from './reservaSchema.js';
import * as path from "node:path";

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
            descripcion : {type: String, trim: true},
                path : {type : String, trim: true},
    }
    ],
    direccion: {
        calle : {
            type: String,
        },
        altura : String,
        ciudad : {
            nombre : String,
            pais : {
                nombre: String,
            },
        },
        lat : String,
        long : String,
    },
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

// Vincular la clase Alojamiento con el schema
alojamientoSchema.loadClass(Alojamiento);

export const AlojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);

export function docToAlojamiento(doc, reservas = []) {
    const alojamiento = new Alojamiento(doc.anfitrion, doc.nombre, doc.direccion);

    alojamiento.setId(doc._id);
    alojamiento.caracteristicas = doc.caracteristicas;
    alojamiento.fotos = doc.fotos;
    alojamiento.horarioCheckIn = doc.horarioCheckIn;
    alojamiento.horarioCheckOut = doc.horarioCheckOut;
    alojamiento.anfitrion = doc.anfitrion;
    alojamiento.cantHuespedesMax = doc.cantHuespedesMax;
    alojamiento.precioPorNoche = doc.precioPorNoche;
    alojamiento.descripcion = doc.descripcion;

    alojamiento.reservas = reservas; // ← ya vienen convertidas
    return alojamiento;
}

export function alojamientoToDocument(alojamiento) {
    return {
        anfitrion : alojamiento.getAnfitrion(),
        nombre : alojamiento.getNombre(),
        descripcion : alojamiento.descripcion,
        precioPorNoche : alojamiento.getPrecioPorNoche(),
        moneda : alojamiento.moneda,
        horarioCheckIn : alojamiento.horarioCheckIn,
        horarioCheckOut : alojamiento.horarioCheckOut,
        direccion : alojamiento.direccion,
        cantHuespedesMax : alojamiento.cantHuespedesMax,
        caracteristicas : alojamiento.caracteristicas,
        fotos : alojamiento.fotos,
        reservas : alojamiento.reservas.map(r => r._id ?? r) // ids solamente
    };
}

function caracteristicaDesdeNombre(nombres) {
    return nombres.map(nombre => {
        switch (nombre) {
            case 'WIFI':
                return WIFI;
            case 'PISCINA':
                return PISCINA;
            case 'MASCOTAS_PERMITIDAS':
                return MASCOTAS_PERMITIDAS;
            case 'ESTACIONAMIENTO':
                return ESTACIONAMIENTO;
            default:
                throw new Error('Estado desconocido: ' + nombre);
        }
    });
}