import { Alojamiento } from "./alojamiento.js"
import { AlojamientoOcupadoError } from "./errors/alojamientoOcupadoError.js"

export class Reserva{
    _id
    fechaAlta
    huespedReservador
    cantHuespedes
    alojamiento
    rangoFechas
    estado
    precioPorNoche
    constructor(huespedReservador, cantHuespedes, alojamiento, rangoFechas, fechaAlta){

/*         if (!alojamiento.estasDisponibleEn(rangoFechas)) {
            throw new AlojamientoOcupadoError("ocupado", 400);
        } */

        this.fechaAlta = fechaAlta ? fechaAlta : new Date();
        this.huespedReservador = huespedReservador;
        this.cantHuespedes = cantHuespedes;
        this.alojamiento = alojamiento;
        this.estado = EstadoReserva.PENDIENTE;
        this.precioPorNoche = alojamiento.precioPorNoche;
        this.rangoFechas = rangoFechas instanceof RangoFechas
            ? rangoFechas
            : new RangoFechas(rangoFechas.fechaInicio, rangoFechas.fechaFin);
    }
    setId(id) {
        this._id = id;
    }
    getId(){
        return this._id;
    }

    seSuperponeCon(otroRango) {
        return this.rangoFechas.seSuperponeCon(otroRango)
    }

    actualizarEstado(estadoReserva){
        this.estado = estadoReserva;
    }
    getAlojamientoNombre(){return this.alojamiento.getNombre()}
    getAlojamientoId(){return this.alojamiento.getId()}

    getCantHuespedes(){return this.cantHuespedes}
    getEstado(){return this.estado}

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

    getHuespedReservadorNombre(){return this.huespedReservador.getNombre()}
    getHuespedId(){return Number(this.huespedReservador.getId())}

    calcularDias(){
        const dias = this.rangoFechas.fechaFin - this.rangoFechas.fechaInicio
        return Math.ceil(dias / (1000 * 60 * 60 * 24));
    }
    mostrarRangoReserva() {
        return this.rangoFechas.rangoToString()
    }
    comenzoReserva(fechaActual){
        return this.rangoFechas.seSuperpone(fechaActual);
    }
    setRangoFecha(nuevoRango){this.rangoFechas = nuevoRango}
    setCantHuespedes(nuevaCant){this.cantHuespedes = nuevaCant}
}
export class RangoFechas{
    fechaInicio
    fechaFin

    constructor(fechaInicio, fechaFin) {
        this.fechaInicio = fechaInicio instanceof Date ? fechaInicio : new Date(fechaInicio);
        this.fechaFin = fechaFin instanceof Date ? fechaFin : new Date(fechaFin);
    }


    getFechaInicio(){return this.fechaInicio}
    getFechaFin(){return this.fechaFin}

/*    getFechaInicioFormateada() {
        return this.fechaInicio.toLocaleDateString("en-US");
    }

      getFechaFinFormateada() {
        return this.fechaFin.toLocaleDateString("en-US");
    }*/

    seSuperponeCon(otroRango) {
        return this.fechaInicio <= otroRango.fechaFin && this.fechaFin >= otroRango.fechaInicio;
    }

    seSuperpone(fecha) { //SE USA PARA CANCELAR
        return this.fechaInicio < fecha
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