export class NotificacionController {
    constructor(notificacionService) {
        this.notificacionService = notificacionService;
    }

    async listarNotificaciones(req, res, next) {
        try{
            const filters = {
                usuarioId : req.params.id,
                leida: req.query.leida
            }
            const notificaciones = await this.notificacionService.listarNotificaciones(filters);
            res.status(200).json(this.toDtos(notificaciones))
        }catch(error) {
            next(error);
        }
    }

    async marcarComoLeida(req, res, next) {
        try{
            const filters = {
                notificacion : req.params.idNoti, //no hace falta en el body si tenemos en el param
                leida : req.body.leida
            }
            
            const notiModificada =  await this.notificacionService.marcarComoLeida(filters);
            res.status(200).json(this.toDto(notiModificada));
        }catch(error){
            next(error);
        }
    }

    toDto(notificacion) {
        return {
        mensaje: notificacion.mensaje,
        usuario: notificacion.usuario._id,
        fechaAlta: notificacion.fechaAlta,
        leida: notificacion.leida,
        fechaLeida: notificacion.fechaLeida
        };
    }

    toDtos(notificaciones) {
        return notificaciones.map(notificacion => this.toDto(notificacion));
    }
}