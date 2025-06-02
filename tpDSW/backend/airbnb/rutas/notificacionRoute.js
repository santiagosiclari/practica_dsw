import { NotificacionController } from '../controllers/notificacionController.js';

export function registerNotificacionRoutes(app, notificacionController) {

    app.get("/usuarios/:idUser/notificaciones", (req, res, next) =>
        notificacionController.listarNotificaciones(req, res, next)
    );

    app.patch("/usuarios/:idUser/notificaciones/:idNoti", (req, res, next) =>
        notificacionController.marcarComoLeida(req, res, next)
    );
}