export class Reserva{
    id //Agrego id para reserva
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
    setId(idNuevo){this.id = idNuevo}
    actualizarEstado(estadoReserva){
        this.estado = estadoReserva;
    }
    getAlojamientoNombre(){return this.alojamiento.getNombre()}
    getCantHuespedes(){return this.cantHuespedes}
    getEstado(){return this.estado}
    getPrecioPorNoche(){return this.precioPorNoche}
    getAnfitrionAlojamiento(){return this.alojamiento.getAnfitrion()}
    getRangoFechaInicio(){return this.rangoFechas.getFechaInicio()}
    getRangoFechaFinal(){return this.rangoFechas.getFechaFin()}
    getRangoFechaInicioString(){return this.rangoFechas.fechaInicioToString()}
    getRangoFechaFinalString(){return this.rangoFechas.fechaFinToString()}
    getHuespedReservadorNombre(){return this.huespedReservador.getNombre()}
    getHuespedId(){return this.huespedReservador.getId()}
    calcularDias(){
        const dias = this.rangoFechas.fechaFin - this.rangoFechas.fechaInicio
        return Math.ceil(dias / (1000 * 60 * 60 * 24));
    }
    mostrarRangoReserva() {
        return this.rangoFechas.rangoToString()
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
    seSuperponeCon(otroRango) {
        return this.fechaInicio < otroRango.fechaFin && this.fechaFin > otroRango.fechaInicio;
    }
    fechaInicioToString() {
        return this.fechaInicio.toDateString()
    }
    fechaFinToString() {
        return this.fechaFin.toDateString()
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
        this.fecha = new Date.now();
        this.estado = estado;
        this.reserva = reserva;
        this.motivo = motivo;
        this.usuario = usuario;
    }
}