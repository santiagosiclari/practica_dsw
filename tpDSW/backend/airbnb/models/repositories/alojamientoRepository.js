import { AlojamientoModel, docToAlojamiento} from "../schemas/alojamientoSchema.js";
import { docToReserva } from "../schemas/reservaSchema.js";
import { alojamientoToDocument } from "../schemas/alojamientoSchema.js"; // asegurate de implementar esto

export class AlojamientoRepository {
    constructor() {
        this.model = AlojamientoModel
    }

    async save(alojamiento) {
        const query = alojamiento._id ? { _id: alojamiento._id } : { _id: new this.model()._id };
        const updateData = alojamientoToDocument(alojamiento); // sin _id

        return await this.model.findOneAndUpdate(
            query,
            updateData,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        );
    }


    async findAll() {
        const alojamientos = await this.model.find().populate({
            path: 'reservas',
            populate: [
                { path: 'huespedReservador' },
                { path: 'alojamiento' }
            ]
        })

        return alojamientos.map(a => {
            a.reservas = a.reservas.map(docToReserva);
            return a;
        });
    }

    async findById(id) {
        const alojamientoDoc = await this.model.findById(id).populate({
            path: 'reservas',
            populate: [
                { path: 'huespedReservador' },
                { path: 'alojamiento' }
            ]
        }).populate('anfitrion');
        if (!alojamientoDoc) return null;
        const reservas = (alojamientoDoc.reservas || []).map(docToReserva).filter(r => r !== undefined);

        return docToAlojamiento(alojamientoDoc, reservas); // ← pasás las reservas listas
    }


    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id);
        return resultado !== null;
    }

    async buscarConFiltros(filtros, page, limit) {
        const query = {};

        // Construcción del filtro MongoDB
        if (filtros.ciudad) query['direccion.ciudad.nombre'] = filtros.ciudad;
        if (filtros.pais) query['direccion.ciudad.pais.nombre'] = filtros.pais;
        if (filtros.lat) query['direccion.lat'] = filtros.lat;
        if (filtros.long) query['direccion.long'] = filtros.long;
        if (!isNaN(filtros.precioMin) && !isNaN(filtros.precioMax)) {
            query.precioPorNoche = { $gte: filtros.precioMin, $lte: filtros.precioMax };
        }
        if (!isNaN(filtros.cantHuespedes)) {
            query.cantHuespedesMax = { $gte: filtros.cantHuespedes };
        }
        if (filtros.caracteristicas?.length) {
            query.caracteristicas = { $all: filtros.caracteristicas };
        }

        const skip = (page - 1) * limit;
        const docs = await this.model.find(query)
            .populate({
                path: 'reservas',
                populate: [
                    { path: 'huespedReservador' },
                    { path: 'alojamiento' }
                ]
            }).populate('anfitrion')
            .skip(skip)
            .limit(limit);
        const total = await this.model.countDocuments(query);

        // Mapeo a instancias de dominio
        const alojamientos = docs.map(doc => {
            const reservas = (doc.reservas || [])
                .map(docToReserva)
                .filter(r => r !== undefined);
            const alojamiento = docToAlojamiento(doc);
            if (alojamiento) alojamiento.reservas = reservas;

            return alojamiento;
        }).filter(a => a !== undefined); // Filtra nulos en caso de errores de datos

        return {
            total,
            page,
            limit,
            alojamientos
        };
    }
}