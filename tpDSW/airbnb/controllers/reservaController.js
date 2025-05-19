export class ReservaController {
    constructor(reservaService) {
        this.reservaService = reservaService
    }

    crearReserva(req, res, next) {
        try {
            const filters = {
                huespedReservador : req.body.huespedReservador, 
                cantHuespedes : req.body.cantHuespedes, 
                alojamiento : req.body.alojamiento, 
                fechaInicio : req.body.fechaInicio,
                fechaFinal : req.body.fechaFinal
            }
            const reserva = this.reservaService.crearReserva(filters)
            res.status(201).json(this.toDto(reserva))
        } catch(error) {
            next(error);
        }
    }

    cancelarReserva(req, res) { //TODO VALIDAR ANTES DE FECHA DE INCIO // Hay que usar cambioEstadoReserva?
        try{
            const reserva = this.reservaService.cancelarReserva(req.body);
            res.status(201).json(this.toDtoEstado(reserva))
        }catch(error){
            console.error(error)
            res.status(400).json
        }
    }

    listarReservas(req, res) {
        try{
            const reservas = this.reservaService.listarReservas();
            console.log(reservas)
            res.status(200).json(this.toDtos(reservas))
        }catch(error) {
            console.error(error)
            res.status(400).json
        }
    }

    listarReservas2(req, res) {
        try{
            const idUsuario = req.params.id; //Devuelve un string
            const reservas = this.reservaService.listarReservas(idUsuario);
            console.log(reservas)
            res.status(200).json(this.toDtos(reservas))
        }catch(error) {
            console.error(error)
            res.status(400).json
        }
    }

    buscarReserva(req, res) { //ENCONTRAR UNA RESERVA CON IDRESERVA
        try {
            const idReserva = req.params.id;
            const reserva = this.reservaService.buscarReserva(idReserva);
            res.status(200).json(this.toDto(reserva));
        }catch(error) {
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
    toDtoEstado(reserva) {
        return {
            id: reserva.getId(),
            huespedReservador: reserva.getHuespedId(),
            estado: reserva.getEstado().nombre,
            alojamiento: reserva.getAlojamientoId(),
            fechaInicio: reserva.getRangoFechaInicioFormateada(),
            fechaFinal: reserva.getRangoFechaFinalFormateada(),
        };
    }
    toDtos(reservas){
        return reservas.map(reserva => this.toDto(reserva));
    }
}