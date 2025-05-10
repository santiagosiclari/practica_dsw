export class ReservaController {
    constructor(reservaService) {
        this.reservaService = reservaService
    }

    crearReserva(req, res) {
        try {
            const reserva = this.reservaService.crearReserva(req.body)
            res.status(201).json(reserva)
        } catch(error) {
            console.error(error)
            res.status(400).json




            
        }
    }
}