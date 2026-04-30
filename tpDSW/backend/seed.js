import mongoose from 'mongoose';
import { UsuarioModel } from './airbnb/models/schemas/usuarioSchema.js';
import { AlojamientoModel } from './airbnb/models/schemas/alojamientoSchema.js';
import { ReservaModel } from './airbnb/models/schemas/reservaSchema.js';
import { NotificacionModel } from './airbnb/models/schemas/notificacionSchema.js';

const MONGODB_URI = process.env.MONGODB_URI;

// --- Datos base para generar aleatoriamente ---
const ciudades = ['Buenos Aires', 'Córdoba', 'Mendoza', 'Bariloche', 'Mar del Plata', 'Rosario', 'Ushuaia', 'Salta', 'Tigre', 'San Martín de los Andes'];
const tipos = ['Loft', 'Departamento', 'Casa', 'Cabaña', 'Estudio', 'Chalet', 'PH'];
const adjetivos = ['moderno', 'luminoso', 'acogedor', 'céntrico', 'amplio', 'rústico', 'con vista increíble', 'de lujo', 'minimalista', 'tranquilo'];
const caracteristicasPosibles = ['WIFI', 'PISCINA', 'MASCOTAS_PERMITIDAS', 'ESTACIONAMIENTO'];

// Banco de imágenes de prueba (Unsplash de arquitectura/interiores)
const bancoImagenes = [
    { descripcion: 'Vista principal', path: 'https://images.unsplash.com/photo-1502672260266-1c1e52409818?w=800&q=80' },
    { descripcion: 'Living', path: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80' },
    { descripcion: 'Habitación', path: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80' },
    { descripcion: 'Cocina', path: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80' },
    { descripcion: 'Fachada', path: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80' },
    { descripcion: 'Patio', path: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80' },
    { descripcion: 'Baño', path: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' },
    { descripcion: 'Comedor', path: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' }
];

// Función helper para obtener elementos aleatorios
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomCaracteristicas = () => {
    const cantidad = getRandomInt(1, 4);
    const mezcladas = [...caracteristicasPosibles].sort(() => 0.5 - Math.random());
    return mezcladas.slice(0, cantidad);
};
const getRandomFotos = () => {
    const cantidad = getRandomInt(2, 4); // Cada alojamiento tendrá entre 2 y 4 fotos
    const mezcladas = [...bancoImagenes].sort(() => 0.5 - Math.random());
    return mezcladas.slice(0, cantidad);
};

const poblarBaseDeDatos = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('📦 Conectado a MongoDB...');

        // 1. Limpieza
        await UsuarioModel.deleteMany({});
        await AlojamientoModel.deleteMany({});
        await ReservaModel.deleteMany({});
        await NotificacionModel.deleteMany({});
        console.log('🧹 Base de datos limpiada.');

        // 2. Usuarios
        const usuarios = await UsuarioModel.insertMany([
            { nombre: 'Martín Pérez', mail: 'martin@ejemplo.com', tipo: 'ANFITRION' },
            { nombre: 'Laura Gómez', mail: 'laura@ejemplo.com', tipo: 'ANFITRION' },
            { nombre: 'Carlos Díaz', mail: 'carlos@ejemplo.com', tipo: 'HUESPED' },
            { nombre: 'Ana López', mail: 'ana@ejemplo.com', tipo: 'HUESPED' }
        ]);
        console.log('👥 Usuarios creados.');

        const anfitriones = [usuarios[0]._id, usuarios[1]._id];
        const huespedes = [usuarios[2]._id, usuarios[3]._id];

        // 3. Generar 55 Alojamientos dinámicamente
        const alojamientosData = Array.from({ length: 55 }).map((_, index) => {
            const tipo = getRandom(tipos);
            const adjetivo = getRandom(adjetivos);
            const ciudad = getRandom(ciudades);

            return {
                anfitrion: getRandom(anfitriones),
                nombre: `${tipo} ${adjetivo} en ${ciudad}`,
                descripcion: `Excelente ${tipo.toLowerCase()} ideal para disfrutar tu estadía en ${ciudad}. Completamente equipado y muy ${adjetivo}.`,
                precioPorNoche: getRandomInt(30, 250),
                moneda: 'DOLAR_USA',
                horarioCheckIn: new Date(new Date().setHours(14, 0, 0, 0)),
                horarioCheckOut: new Date(new Date().setHours(10, 0, 0, 0)),
                cantHuespedesMax: getRandomInt(1, 8),
                caracteristicas: getRandomCaracteristicas(),
                direccion: {
                    calle: 'Calle Falsa',
                    altura: getRandomInt(100, 9999).toString(),
                    ciudad: { nombre: ciudad, pais: { nombre: 'Argentina' } }
                },
                fotos: getRandomFotos()
            };
        });

        const alojamientos = await AlojamientoModel.insertMany(alojamientosData);
        console.log(`🏠 ${alojamientos.length} Alojamientos creados con sus fotos.`);

        // 4. Reservas (Vinculadas a los primeros dos alojamientos generados para no complicar)
        const reservas = await ReservaModel.insertMany([
            {
                huespedReservador: huespedes[0],
                alojamiento: alojamientos[0]._id,
                cantHuespedes: 2,
                fechaInicio: new Date('2026-06-10T14:00:00Z'),
                fechaFinal: new Date('2026-06-15T10:00:00Z'),
                fechaAlta: new Date(),
                estado: 'CONFIRMADA',
                precioPorNoche: alojamientos[0].precioPorNoche
            },
            {
                huespedReservador: huespedes[1],
                alojamiento: alojamientos[1]._id,
                cantHuespedes: 3,
                fechaInicio: new Date('2026-07-20T14:00:00Z'),
                fechaFinal: new Date('2026-07-27T10:00:00Z'),
                fechaAlta: new Date(),
                estado: 'PENDIENTE',
                precioPorNoche: alojamientos[1].precioPorNoche
            }
        ]);

        await AlojamientoModel.findByIdAndUpdate(alojamientos[0]._id, { $push: { reservas: reservas[0]._id } });
        await AlojamientoModel.findByIdAndUpdate(alojamientos[1]._id, { $push: { reservas: reservas[1]._id } });
        console.log('📅 Reservas creadas y vinculadas.');

        // 5. Notificaciones
        await NotificacionModel.insertMany([
            {
                mensaje: `¡Tu reserva en ${alojamientos[0].nombre} ha sido confirmada!`,
                usuario: huespedes[0],
                leida: false
            },
            {
                mensaje: 'Tenés una nueva solicitud de reserva pendiente.',
                usuario: anfitriones[1],
                leida: true,
                fechaLeida: new Date()
            }
        ]);
        console.log('🔔 Notificaciones creadas.');

        console.log('✅ Base de datos poblada exitosamente con 55 alojamientos de prueba.');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error);
        process.exit(1);
    }
};

poblarBaseDeDatos();