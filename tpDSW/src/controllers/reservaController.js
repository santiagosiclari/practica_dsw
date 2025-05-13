export class ReservaController {
    constructor(reservaService) {
        this.reservaService = reservaService
    }

    crearReserva(req, res, next) {
        try {
            const reserva = this.reservaService.crearReserva(req.body)
            res.status(201).json(reserva)
        } catch(error) {
            next(error)
        }
    }
}