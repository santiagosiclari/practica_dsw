export class ReservaController {
    constructor(reservaService) {
        this.reservaService = reservaService
    }

    async crearReserva(req, res, next) {
        try {
            const filters = {
                huespedReservador : req.body.huespedReservador,
                cantHuespedes : req.body.cantHuespedes,
                alojamiento : req.body.alojamiento,
                fechaInicio : req.body.fechaInicio,
                fechaFinal : req.body.fechaFinal
            }
            const reserva = await this.reservaService.crearReserva(filters)
            res.status(201).json(this.toDto(reserva))
        } catch(error) {
            next(error);
        }
    }

/*     cancelarReserva(req, res, next) {
        try{
            const filters = {
                motivo : req.body.motivo,
                usuario : req.body.usuario
            }
            const idReserva = req.params.id
            const reserva = this.reservaService.cancelarReserva(idReserva, filters);
            res.status(201).json(this.toDtoEstado(reserva))
        }catch(error){
            next(error);
        }
    } */

    async listarReservas(req, res, next) {
        try{
            const reservas = await this.reservaService.listarReservas();
            res.status(200).json(this.toDtos(reservas))
        }catch(error) {
            next(error);
        }
    }

    async listarReservasUsuario(req, res, next) {
        try{
            const idUsuario = req.params.id;
            const reservas = await this.reservaService.listarReservasUsuario(idUsuario);
            res.status(200).json(this.toDtos(reservas))
        }catch(error) {
            next(error);
        }
    }

    async buscarReserva(req, res, next) { //ENCONTRAR UNA RESERVA CON IDRESERVA
        try {
            const idReserva = req.params.id;
            const reserva = await this.reservaService.buscarReserva(idReserva);
            res.status(200).json(this.toDto(reserva));
        }catch(error) {
            next(error);
        }
    }

/*     modificarReserva(req, res, next){
        try{
            const filters = {
                cantHuespedes : req.body.cantHuespedes,
                fechaInicio : req.body.fechaInicio,
                fechaFinal : req.body.fechaFinal,
            }
            const idReserva = req.params.id;
            const reservaModificada = this.reservaService.modificarReserva(Number(idReserva), filters);
            res.status(200).json(this.toDto(reservaModificada));
        }catch(error){
            next(error);
        }
    } */

    toDto(reserva) {
        return {
            id: reserva.id,
            fechaAlta: new Date(reserva.fechaAlta).toLocaleDateString("en-US"),
            huespedReservador: reserva.huespedReservador,
            cantHuespedes: reserva.getCantHuespedes(),
            alojamiento: reserva.alojamiento,
            fechaInicio: reserva.fechaInicio,
            fechaFinal: reserva.fechaFinal,
            precioPorNoche: reserva.getPrecioPorNoche()
        };
    }
    toDtoEstado(reserva) {
        return {
            id: reserva.getId(),
            huespedReservador: reserva.getHuespedId(),
            estado: reserva.getEstado().nombre,
            alojamiento: reserva.getAlojamientoId(),
            fechaInicio: reserva.fechaInicio,
            fechaFinal: reserva.fechaFinal,
        };
    }
    toDtos(reservas){
        return reservas.map(reserva => this.toDto(reserva));
    }
}