import { ReservaController } from "../controllers/reservaController.js";

export function registerReservaRoutes(app, ReservaController){
    app.post("/reservas", (req, res, next) => reservaController.crearReserva(req, res));
}