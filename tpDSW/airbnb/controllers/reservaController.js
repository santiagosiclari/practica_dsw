export class ReservaController {
    constructor(reservaService) {
        this.reservaService = reservaService
    }

    crearReserva(req, res) {
        try {
            const reserva = this.reservaService.crearReserva(req.body)
            res.status(201).json(this.toDto(reserva))
        } catch(error) {
            console.error(error)
            res.status(400).json
        }
    }

    toDto(reserva) {
        return {
            id: reserva.getId(),
            fechaAlta: new Date(reserva.fechaAlta).toLocaleDateString("en-US"),
            huespedReservador: reserva.getHuespedId(),
            cantHuespedes: reserva.getCantHuespedes(),
            alojamiento: reserva.getAlojamientoId(),
            fechaInicio: reserva.getRangoFechaInicioFormateada(),
            fechaFinal: reserva.getRangoFechaFinalFormateada(),
            precioPorNoche: reserva.getPrecioPorNoche()
        };
    }
}