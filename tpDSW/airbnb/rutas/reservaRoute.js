import { ReservaController } from '../controllers/reservaController.js';

export function registerReservaRoutes(app, getController) {

    app.post("/reservas", (req, res) => 
        getController(ReservaController).crearReserva(req, res)
    );
}