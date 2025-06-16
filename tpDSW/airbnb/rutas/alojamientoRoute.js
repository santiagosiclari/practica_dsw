import { AlojamientoController } from '../controllers/alojamientoController.js';

export function registerAlojamientoRoutes(app, alojamientoController) {

    app.get("/alojamientos", (req, res, next) =>
        alojamientoController.listarAlojamientos(req, res, next) //Listar todas las reservas
    );

}