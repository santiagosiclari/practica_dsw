import { ReservaModel } from "../schemas/reservaSchema.js";

export class ReservaRepository {
    constructor() {
        this.model = ReservaModel;
    }

    async save(reserva) {
        const query = reserva.id ? { _id: reserva.id } : { _id: new this.model()._id };
        return await this.model.findOneAndUpdate(
            query,
            reserva,
            { 
                new: true, 
                runValidators: true,
                upsert: true
            }
        );
    }

    async findAll() {
        const reservas = await this.model.find()
        return reservas
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async deleteById(id) {
        const resultado = await this.model.findByIdAndDelete(id);
        return resultado !== null;
    }

    async obtenerReservas(idUsuario) {
         const reservas = await this.model.find({ huespedReservador: idUsuario })
         if(reservas.length === 0) {
             throw new Error("No existen reservas para este usuario")
         }
         return reservas
     }
}