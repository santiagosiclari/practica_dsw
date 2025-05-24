import { AlojamientoController } from '../controllers/alojamientoController.js';

export function registerAlojamientoRoutes(app, getController) {

    app.get("/alojamientos", (req, res, next) =>
        getController(AlojamientoController).listarAlojamientos(req, res, next) //Listar todas las reservas
    );

}