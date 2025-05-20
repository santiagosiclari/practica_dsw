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
    
    app.get("/reservas/usuario/:id", (req, res, next) =>
        getController(ReservaController).listarReservasUsuario(req, res, next)
    );

    app.patch("/reservas/:id/cancelar", (req, res, next) =>
        getController(ReservaController).cancelarReserva(req, res, next)
    );

    app.patch("/reservas/:id", (req, res, next) =>
        getController(ReservaController).modificarReserva(req, res, next)
    );
}