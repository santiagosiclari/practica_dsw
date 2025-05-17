import { ReservaController } from '../controllers/reservaController.js';

export function registerReservaRoutes(app, getController) {

    app.post("/reservas", (req, res) => 
        getController(ReservaController).crearReserva(req, res)
    );

    app.get("/reservas/:id", (req, res) =>
        getController(ReservaController).listarReservas(req, res)
    );
    app.patch("/reservas/cancelarReserva", (req, res) =>
        getController(ReservaController).cancelarReserva(req, res)
    );
}