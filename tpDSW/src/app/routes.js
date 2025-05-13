export const configureRoutes =(app, {reservaController}) => {
    app.post("/reservas", reservaController.crearReserva.bind(reservaController));
}