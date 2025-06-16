import {docToNotificacion, NotificacionModel, notificacionToDocument} from "../schemas/notificacionSchema.js";
import { ValidationError } from "../../errors/appError.js";
export class NotificacionRepository {
    constructor() {
        this.model = NotificacionModel;
    }

    async save(notificacion) {
        const query = notificacion._id ? { _id: notificacion._id } : { _id: new this.model()._id };
        const notiMongo = await this.model.findOneAndUpdate(
            query,
            notificacionToDocument(notificacion),
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        );
        return docToNotificacion(notiMongo);
    }

    async findAll(filters = {}) {
        const notificaciones = await this.model.find({
            usuario: filters.usuario,
            leida: filters.leida});
        if(notificaciones.length === 0){
            throw new ValidationError("No se encontraron notificaciones")
        }
        return notificaciones.map(docToNotificacion);
    }

    async actualizarEstado(idNotificacion, idUser, camposActualizar) {
        const notiModificada = await this.model.findOneAndUpdate(
        {_id: idNotificacion, usuario: idUser},
        { $set: camposActualizar},
        { new: true, runValidators: true }
    );
        if (!notiModificada) {
            throw new ValidationError("No se encontro la notificacion o el usuario es incorrecto")
        }
        return notiModificada;
}
}