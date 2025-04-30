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
        const notificacion = new Notificacion(mensaje, reserva.getAlojamiento().getAnfitrion())
        return notificacion
    }

    crearSegunAceptar(reserva) {
        mensaje = "El anfitrión de la reserva "
            + reserva.getAlojamiento().getNombre()
            + " ha aceptado su solicitud de reserva."
        const notificacion = new Notificacion(mensaje, reserva.getHuespedReservador())
    }

    crearSegunRechazo(reserva, motivoCancelacion = null) {
        mensaje = "El cliente "
            + reserva.getHuespedReservador()
            + " ha cancelado su reserva sobre "
            + reserva.getAlojamiento.getNombre()
        if (motivoCancelacion) {
            mensaje += " debido al siguiente motivo: '"
            + motivoCancelacion
            + "'."
        }
        const notificacion = new Notificacion(mensaje, reserva.getAlojamiento().getAnfitrion())
    }
}