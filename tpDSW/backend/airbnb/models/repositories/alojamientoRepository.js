import { AlojamientoModel, docToAlojamiento} from "../schemas/alojamientoSchema.js";
import { docToReserva } from "../schemas/reservaSchema.js";

export class AlojamientoRepository {
    constructor() {
        this.model = AlojamientoModel
    }

    async save(alojamiento) {
        const query = alojamiento.id ? { _id: alojamiento.id } : { _id: new this.model()._id };
        return await this.model.findOneAndUpdate(
            query,
            alojamiento,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        );
    }

    async findAll() {
        const alojamientos = await this.model.find().populate('reservas')
        return alojamientos.map(a => {
            a.reservas = a.reservas.map(docToReserva);
            return a;
        });
    }

    async findById(id) {
        const alojamiento = await this.model.findById(id).populate('reservas');
        if (alojamiento && alojamiento.reservas) {
            alojamiento.reservas = alojamiento.reservas.map(docToReserva);
        }
        return alojamiento;
    }

    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id);
        return resultado !== null;
    }

    async buscarConFiltros(filtros, page, limit) {
        const query = {};
        if(filtros.ciudad){ query['direccion.ciudad.nombre'] = filtros.ciudad }
        if (filtros.pais) query['direccion.ciudad.pais.nombre'] = filtros.pais;
        if (filtros.lat) query['direccion.lat'] = filtros.lat;
        if (filtros.long) query['direccion.long'] = filtros.long;
        if (!isNaN(filtros.precioMin) && !isNaN(filtros.precioMax)) query.precioPorNoche = { $gte: filtros.precioMin, $lte: filtros.precioMax };
        if (!isNaN(filtros.cantHuespedes)) query.cantHuespedesMax = { $gte: filtros.cantHuespedes };
        if (filtros.caracteristicas?.length) query.caracteristicas = { $all: filtros.caracteristicas };
        const skip = (page - 1) * limit;

        const resultados = await this.model.find(query).populate('reservas').skip(skip).limit(limit);
        const total = await this.model.countDocuments(query);

        const alojamientos = resultados.map(docToAlojamiento)

               return {
                    total,
                    page,
                    limit,
                    alojamientos
                };
    }
}