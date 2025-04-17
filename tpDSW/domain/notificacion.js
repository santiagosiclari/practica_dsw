export class Notificacion{
    mensaje
    usuario
    fechaAlta
    fechaLeida
    constructor(mensaje, usuario){
        this.mensaje = mensaje;
        this.usuario = usuario;
        this.fechaAlta = new Date.now();
        this.leida = false;
        this.fechaLeida = null;
    }
    marcarComoLeida(){
        this.leida = true;
        this.fechaLeida = new Date.now()
    }
}
export class FactoryNotificacion{
    crearSegunReserva(reserva){
        mensaje = "El cliente "
            + reserva.getHuespedReservador().getNombre()
            + " realizó una reserva desde el día "
            + reserva.getRangoFechas().getFechaInicio().toDateString()
            + " hasta el día "
            + reserva.getRangoFechas().getFechaFin().toDateString()
            + " por un total de "
            + reserva.calcularDias().toString()
            + " días sobre el alojamiento "
            + reserva.getAlojamiento().getNombre()
            + "."
        const notificacion = new Notificacion(mensaje, reserva.getHuespedReservador())
        return notificacion
    }
}