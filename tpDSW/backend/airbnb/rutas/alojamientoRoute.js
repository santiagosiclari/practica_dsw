export function registerAlojamientoRoutes(app, alojamientoController) {

    app.get("/alojamientos", (req, res, next) =>
        alojamientoController.listarAlojamientos(req, res, next)
    );

    app.get("/alojamientos/:id", (req, res, next) =>
        alojamientoController.obtenerAlojamiento(req, res, next)
    );
}