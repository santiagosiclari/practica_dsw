import { NotificacionModel } from "../schemas/notificacionSchema.js";

export class NotificacionRepository {
    constructor() {
        this.model = NotificacionModel;
    }

    async save(notificacion) {
        const query = notificacion._id ? { _id: notificacion._id } : { _id: new this.model()._id };
        const notiMongo = await this.model.findOneAndUpdate(
            query,
            notificacion,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        );
        return notiMongo;
    }

    async findAll(filters = {}) {
        const query = {};

        if (filters.usuarioId) {
            query.usuario = filters.usuarioId;
        }

      if (filters.leida !== undefined) {
    query.leida = filters.leida === 'true';  // convierte string a boolean
}

        return await this.model.find(query);
    }

    async actualizarEstado(idNotificacion, camposActualizar) {
    const notiModificada = await this.model.findByIdAndUpdate(
        idNotificacion,
        { $set: camposActualizar },
        { new: true, runValidators: true }
    );
    return notiModificada;
}
}