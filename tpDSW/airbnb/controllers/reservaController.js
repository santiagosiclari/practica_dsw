import { Reserva, RangoFechas } from "../models/domain/reserva.js";

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

    async cambiarEstados(req, res, next) {
        try{
            const filters = {
                estado : req.body.estado,
                reserva : req.body.reserva,
                motivo : req.body.motivo,
                usuario : req.body.usuario
            }
            const reserva = await this.reservaService.cambiarEstados(filters);
            res.status(200).json(this.toDto(reserva))
        }catch(error){
            next(error);
        }
    }

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

    async modificarReserva(req, res, next){
        try{
            const filters = {
                reserva : req.body.reserva,
                cantHuespedes : req.body.cantHuespedes,
                fechaInicio : req.body.fechaInicio,
                fechaFinal : req.body.fechaFinal,
            }
            const reservaModificada = await this.reservaService.modificarReserva(filters);
            res.status(200).json(this.toDto(reservaModificada));
        }catch(error){
            next(error);
        }
    }

    toDto(reserva) {
        return {
            _id: reserva._id,
            fechaAlta: reserva.fechaAlta,
            huespedReservador: reserva.huespedReservador,
            cantHuespedes: reserva.getCantHuespedes(),
            alojamiento: reserva.alojamiento,
            fechaInicio: reserva.getRangoFechaInicio(),
            fechaFinal: reserva.getRangoFechaFinal(),
            precioPorNoche: reserva.getPrecioPorNoche()
        };
    }
//     toDtoEstado(reserva) {
//         return {
//             id: reserva.getId(),
//             huespedReservador: reserva.getHuespedId(),
//             estado: reserva.getEstado().nombre,
//             alojamiento: reserva.getAlojamientoId(),
// /*             fechaInicio: reserva.fechaInicio,
//             fechaFinal: reserva.fechaFinal, */
//         };
//     }

    toDtos(reservas){
        return reservas.map(reserva => this.toDto(reserva));
    }
}