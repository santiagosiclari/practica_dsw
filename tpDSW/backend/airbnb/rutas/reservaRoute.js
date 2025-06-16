export function registerReservaRoutes(app, reservaController) {

    app.post("/reservas", (req, res, next) =>
        reservaController.crearReserva(req, res, next)
    );

    app.get("/reservas", (req, res, next) =>
        reservaController.listarReservas(req, res, next) //Listar todas las reservas
    );

    app.get("/reservas/:id", (req, res, next) =>
        reservaController.buscarReserva(req, res, next) //Hallar una reserva determinada
    );

    app.get("/usuario/:id/reservas", (req, res, next) =>
        reservaController.listarReservasUsuario(req, res, next)
    );

    app.post("/reservas/:id/cambiosDeEstado", (req, res, next) =>
        reservaController.cambiarEstados(req, res, next)
    );

    app.patch("/reservas/:id", (req, res, next) =>
        reservaController.modificarReserva(req, res, next)
    );
}