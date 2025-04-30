export class Reserva{
    fechaAlta
    huespedReservador
    cantHuespedes
    alojamiento
    rangoFechas
    estado
    precioPorNoche
    constructor(huespedReservador, cantHuespedes, alojamiento, rangoFechas){
        this.fechaAlta = new Date.now();
        this.huespedReservador = huespedReservador;
        this.cantHuespedes = cantHuespedes;
        this.alojamiento = alojamiento;
        this.rangoFechas = rangoFechas;
        this.estado = EstadoReserva.PENDIENTE;
        this.precioPorNoche = alojamiento.getPrecioPorNoche();
    }
    actualizarEstado(EstadoReserva){
        this.estado = EstadoReserva;
    }
    getAlojamiento(){return this.alojamiento}
    getRangoFechas(){return this.rangoFechas}
    getHuespedReservador(){return this.huespedReservador}
    calcularDias(){
        const dias = this.rangoFechas.fechaFin - this.rangoFechas.fechaInicio
        return Math.ceil(dias / (1000 * 60 * 60 * 24));
    }
}
export class RangoFechas{
    fechaInicio
    fechaFin
    constructor(fechaInicio, fechaFin){
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
    getFechaInicio(){return this.fechaInicio}
    getFechaFin(){return this.fechaFin}
}
class EstadoReserva{
    constructor(nombre){
        this.nombre = nombre
    }
}

const PENDIENTE = new EstadoReserva('PENDIENTE')
const CONFIRMADA = new EstadoReserva('CONFIRMADA')
const CANCELADA = new EstadoReserva('CANCELADA')

export class CambioEstadoReserva{
    fecha
    estado
    reserva
    motivo
    usuario
    constructor(estado, reserva, motivo, usuario){
        this.fecha = new Date.now();
        this.estado = estado;
        this.reserva = reserva;
        this.motivo = motivo;
        this.usuario = usuario;
    }
}