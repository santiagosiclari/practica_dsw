import { AlojamientoModel } from "../schemas/alojamientoSchema.js";
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
}