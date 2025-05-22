import { NotificacionController } from '../controllers/notificacionController.js';

export function registerNotificacionRoutes(app, getController) {

    app.get("/usuarios/:idUser/notificaciones", (req, res, next) =>
        getController(NotificacionController).listarNotificaciones(req, res, next)
    );

    app.patch("/usuarios/:idUser/notificaciones/:idNoti", (req, res, next) =>
        getController(NotificacionController).marcarComoLeida(req, res, next)
    );
}