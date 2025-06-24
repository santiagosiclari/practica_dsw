import { RangoFechas } from "../models/domain/reserva.js";
import {ValidationError} from "../errors/appError.js";

export class ReservaController {
    constructor(reservaService) {
        this.reservaService = reservaService
    }

    async crearReserva(req, res, next) {
        try {
            const parametros = {
                huespedReservador : req.body.huespedReservador,
                cantHuespedes : req.body.cantHuespedes,
                alojamiento : req.body.alojamiento,
                fechaInicio : req.body.fechaInicio,
                fechaFinal : req.body.fechaFinal
            }
            await this.reservaService.validarReservaExistente(parametros.fechaInicio, parametros.fechaFinal, parametros.alojamiento);
            const rangoFechas = new RangoFechas(parametros.fechaInicio, parametros.fechaFinal);
            const reserva = await this.reservaService.crearReserva(this.validarCrear(parametros), rangoFechas)

            res.status(201).json(this.reservaToDto(reserva))
        } catch(error) {
            next(error);
        }
    }

    validarCrear(parametros){
        if (
            !parametros.huespedReservador ||
            typeof parametros.cantHuespedes !== "number" ||
            !parametros.alojamiento ||
            !parametros.fechaInicio ||
            !parametros.fechaFinal
        ) {
            throw new ValidationError("Faltan campos requeridos o son inválidos");
        }
        return parametros;
    }

    validarCambiarEstado(parametros){
        if (
            !parametros.motivo ||
            !parametros.usuario ||
            !parametros.estado ||
            !parametros.reserva
        ) {
            throw new ValidationError("Faltan campos requeridos o son inválidos");
        }

        return parametros;
    }
    async cambiarEstados(req, res, next) {
        try{
            const parametros = {
                estado : req.body.estado, //STRING
                reserva : req.body.reserva,
                motivo : req.body.motivo,
                usuario : req.body.usuario
            }
            const reserva = await this.reservaService.cambiarEstados(this.validarCambiarEstado(parametros));
            res.status(200).json(this.reservaToDto(reserva))
        }catch(error){
            next(error);
        }
    }

    async listarReservas(req, res, next) {
        try{
            const reservas = await this.reservaService.listarReservas();
            res.status(200).json(this.reservasToDtos(reservas))
        }catch(error) {
            next(error);
        }
    }

    async listarReservasUsuario(req, res, next) {
        try{
            const idUsuario = req.params.id;
            const reservas = await this.reservaService.listarReservasUsuario(idUsuario);
            res.status(200).json(this.reservasToDtos(reservas))
        }catch(error) {
            next(error);
        }
    }

    async buscarReserva(req, res, next) { //ENCONTRAR UNA RESERVA CON IDRESERVA
        try {
            const idReserva = req.params.id;
            const reserva = await this.reservaService.buscarReserva(idReserva);
            res.status(200).json(this.reservaToDto(reserva));
        }catch(error) {
            next(error);
        }
    }

    async modificarReserva(req, res, next){
        try{
            const parametros = {
                reserva : req.body.reserva,
                cantHuespedes : req.body.cantHuespedes,
                fechaInicio : req.body.fechaInicio,
                fechaFinal : req.body.fechaFinal,
            }
            const reservaModificada = await this.reservaService.modificarReserva(parametros);
            res.status(200).json(this.reservaToDto(reservaModificada));
        }catch(error){
            next(error);
        }
    }

    //DTO

    reservaToDto(reserva) {
        return {
            _id: reserva._id,
            fechaAlta: reserva.fechaAlta,
            huespedReservador: reserva.huespedReservador._id,
            cantHuespedes: reserva.getCantHuespedes(),
            alojamiento: reserva.alojamiento._id,
            fechaInicio: reserva.getRangoFechaInicio(),
            fechaFinal: reserva.getRangoFechaFinal(),
            precioPorNoche: reserva.getPrecioPorNoche(),
            estado: reserva.getEstado()
        };
    }

    reservasToDtos(reservas){
        return reservas.map(reserva => this.reservaToDto(reserva));
    }
}