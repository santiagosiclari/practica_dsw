import {FactoryNotificacion} from "./notificacion.js";
import {NoPermitoCambioEstadoReservaError, ValidationError} from "../../errors/appError.js";
import { AlojamientoOcupadoError } from "./errors/alojamientoOcupadoError.js";
import { AlojamientoSobrepasadoError } from "./errors/alojamientoSobrepasado.js";
import dayjs from "dayjs";

export class Reserva{
    _id
    fechaAlta
    huespedReservador
    cantHuespedes
    alojamiento
    rangoFechas
    estado
    precioPorNoche
    cambiosDeEstado

    constructor(huespedReservador, cantHuespedes, alojamiento, rangoFechas, fechaAlta){
        this.fechaAlta = fechaAlta ? fechaAlta : new Date();
        this.huespedReservador = huespedReservador;
        this.cantHuespedes = cantHuespedes;
        this.alojamiento = alojamiento;
        this.estado = EstadoReserva.PENDIENTE;
        this.precioPorNoche = alojamiento.precioPorNoche;
        this.rangoFechas = rangoFechas;
        this.cambiosDeEstado = [];
    }

    notificacionAlCrear(){
        return new FactoryNotificacion().crearSegunReserva(this);
    }
    notificacionAlAceptar(){
        return new FactoryNotificacion().crearSegunAceptar(this);
    }
    notificacionAlRechazar(motivo){
        return new FactoryNotificacion().crearSegunRechazo(this, motivo);
    }
    notificacionAlCancelar(motivo){
        return new FactoryNotificacion().crearSegunCancelacion(this, this.huespedReservador, motivo);
    }
    setId(id) {
        this._id = id;
    }
    getId(){
        return this._id;
    }
    seSuperponeCon(otroRango) {
        if (!this.rangoFechas || typeof this.rangoFechas.seSuperponeCon !== 'function') {
            throw new Error("Reserva sin rango de fechas correctamente inicializado");
        }
        return this.rangoFechas.seSuperponeCon(otroRango);
    }

    actualizarEstado(cambioEstado){
       if(this.getRangoFechaInicio() <= new Date() &&
            cambioEstado.estado === 'CANCELADA' ){
                throw new NoPermitoCambioEstadoReservaError(
                    "La reserva superó la fecha límite para ser cancelada"
                );
        }
       
        this.cambiosDeEstado.push(cambioEstado);
        this.estado = cambioEstado.estado
    
        switch (this.estado) {
            case 'CONFIRMADA':
                return this.notificacionAlAceptar();
            case 'CANCELADA':
                return this.notificacionAlCancelar(cambioEstado.motivo);
            case 'RECHAZADA':
                return this.notificacionAlRechazar(cambioEstado.motivo);
            default:
                throw new ValidationError("Datos de Estado inválidos")
        }
    }
    getAlojamientoNombre(){return this.alojamiento.getNombre()}
    getAlojamientoId(){return this.alojamiento.getId()}

    getCantHuespedes(){return this.cantHuespedes}
    getEstado(){return this.estado}
    getEstadoNombre(){
        return this.estado.nombre;
    }

    getPrecioPorNoche(){return this.precioPorNoche}

    getAnfitrionAlojamiento(){return this.alojamiento.getAnfitrion()}

    getRangoFechaInicio(){return this.rangoFechas.getFechaInicio()}
    getRangoFechaFinal(){return this.rangoFechas.getFechaFin()}
    getRangoFechas(){return this.rangoFechas}
/*    getRangoFechaInicioFormateada() {
        return this.rangoFechas.getFechaInicioFormateada();
    }
      getRangoFechaFinalFormateada() {
        return this.rangoFechas.getFechaFinFormateada();
    }*/

    getHuespedNombre(){return this.huespedReservador.getNombre()}
    getHuespedId(){return this.huespedReservador.getId()}

    calcularDias() {
        return this.rangoFechas.fechaFin.diff(this.rangoFechas.fechaInicio, 'day');
    }

    setRangoFecha(nuevoRango) {
        if (!this.alojamiento.estasDisponibleEn(nuevoRango)) {
            throw new AlojamientoOcupadoError("Ya hay una reserva en este rango de fechas", 403);
        }
        this.rangoFechas = nuevoRango
    }

    setCantHuespedes(nuevaCant) {
        if(!this.alojamiento.puedenAlojarse(nuevaCant)) {
            throw new AlojamientoSobrepasadoError("La cantidad de huespedes supera el maximo permitido por el alojamiento", 400);
        }
        this.cantHuespedes = nuevaCant
    }
}
export class RangoFechas{
    fechaInicio
    fechaFin

    constructor(fechaInicio, fechaFin) {
        this.fechaInicio = dayjs(fechaInicio)
        this.fechaFin = dayjs(fechaFin)

        if (!this.fechaInicio.isValid() || !this.fechaFin.isValid()) {
            throw new Error("Fechas inválidas");
        }
    }
    getFechaInicio(){return this.fechaInicio.toDate()}
    getFechaFin(){return this.fechaFin.toDate()}

    seSuperponeCon(otroRango) {
        return this.fechaInicio.isBefore(otroRango.getFechaFin()) && this.fechaFin.isAfter(otroRango.getFechaInicio());
    }
}
export class EstadoReserva{
    constructor(nombre){
        this.nombre = nombre
    }
}

export const PENDIENTE = new EstadoReserva('PENDIENTE')
export const CONFIRMADA = new EstadoReserva('CONFIRMADA')
export const CANCELADA = new EstadoReserva('CANCELADA')
export const RECHAZADA = new EstadoReserva('RECHAZADA')

export class CambioEstadoReserva{
    fecha
    estado
    reserva
    motivo
    usuario
    constructor(estado, reserva, motivo, usuario){
        this.fecha = new Date();
        this.estado = estado;
        this.reserva = reserva;
        this.motivo = motivo;
        this.usuario = usuario;
    }
}