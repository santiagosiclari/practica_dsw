import { ReservaModel, reservaToDocument, docToReserva } from "../schemas/reservaSchema.js";

export class ReservaRepository {
    constructor() {
        this.model = ReservaModel;
    }

    async save(reserva) {
        const query = reserva._id ? { _id: reserva._id } : { _id: new this.model()._id };
        const reservaMongo = await this.model.findOneAndUpdate(
            query,
            reservaToDocument(reserva),
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        );
        return docToReserva(reservaMongo);
    }

    async findAll() {
        const reservas = await this.model.find();
        return reservas.map(docToReserva);
    }

    async findById(id) {
        const reserva = await this.model.findById(id);
        return docToReserva(reserva);
    }

    async obtenerReservas(idUsuario) {
         const reservas = await this.model.find({ huespedReservador: idUsuario })
         if(reservas.length === 0) {
             throw new Error("No existen reservas para este usuario")
         }
         return reservas.map(docToReserva);
     }
}