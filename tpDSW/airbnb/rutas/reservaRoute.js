import { ReservaController } from '../controllers/reservaController.js';

export function registerReservaRoutes(app, getController) {

    app.post("/reservas", (req, res, next) => 
        getController(ReservaController).crearReserva(req, res, next)
    );

    app.get("/reservas", (req, res, next) =>
        getController(ReservaController).listarReservas(req, res, next) //Listar todas las reservas
    );

    app.get("/reservas/:id", (req, res, next) =>
        getController(ReservaController).buscarReserva(req, res, next) //Hallar una reserva determinada
    );

    app.patch("/reservas/cancelarReserva", (req, res, next) =>
        getController(ReservaController).cancelarReserva(req, res, next)
    );
}