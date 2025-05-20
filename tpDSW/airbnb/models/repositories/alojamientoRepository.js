import { AlojamientoModel } from "../schemas/alojamientoSchema.js";

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
        const alojamientos = await this.model.find()
        return alojamientos
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id);
        return resultado !== null;
    }
}