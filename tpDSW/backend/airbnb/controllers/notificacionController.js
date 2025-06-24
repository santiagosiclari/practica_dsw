import { ValidationError } from "../errors/appError.js";

export class NotificacionController {
    constructor(notificacionService) {
        this.notificacionService = notificacionService;
    }

    async listarNotificaciones(req, res, next) {
        try{
            const filters = {
                usuario : req.params.idUser,
                leida: req.body.leida
            }
            const notificaciones = await this.notificacionService.listarNotificaciones(filters);
            res.status(200).json(this.notificacionesToDto(notificaciones))
        }catch(error) {
            next(error);
        }
    }

    async marcarComoLeida(req, res, next) {
        try{
            const parametros = {
                usuario : req.params.idUser,
                notificacion : req.params.idNoti,
                leida : req.body.leida
            }
            const notiModificada =  await this.notificacionService.marcarComoLeida(this.validar(parametros));
            res.status(200).json(this.notificacionToDTO(notiModificada));
        }catch(error){
            next(error);
        }
    }
    validar(parametros){
        if(!parametros.usuario || !parametros.notificacion || !parametros.leida){
            throw new ValidationError("Datos de validación inválidos")
        }
        return parametros;
    }

    notificacionToDTO(notificacion) {
        return {
            _id: notificacion._id,
            mensaje: notificacion.mensaje,
            usuario: notificacion.usuario,
            fechaAlta: notificacion.fechaAlta,
            leida: notificacion.leida,
            fechaLeida: notificacion.fechaLeida
        };
    }

    notificacionesToDto(notificaciones) {
        return notificaciones.map(notificacion => this.notificacionToDTO(notificacion));
    }
}