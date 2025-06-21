export function registerAlojamientoRoutes(app, alojamientoController) {

    app.get("/alojamientos", (req, res, next) =>
        alojamientoController.listarAlojamientos(req, res, next)
    );

}