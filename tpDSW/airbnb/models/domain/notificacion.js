import { Reserva } from "./reserva.js";

export class Notificacion {
  mensaje;
  usuario;
  fechaAlta;
  fechaLeida;
  constructor(mensaje, usuario) {
    this.mensaje = mensaje;
    this.usuario = usuario;
    this.fechaAlta = Date.now();
    this.leida = false;
    this.fechaLeida = null;
  }
  marcarComoLeida() {
    this.leida = true;
    this.fechaLeida = Date.now();
  }
}
export class FactoryNotificacion {
  crearSegunReserva(reserva) {
    const mensaje =
      "El cliente " +
      reserva.getHuespedNombre() +
      " realizó una reserva desde el día " +
      reserva.getRangoFechaInicio().toDateString() +
      " hasta el día " +
      reserva.getRangoFechaFinal().toDateString() +
      " por un total de " +
      reserva.calcularDias().toString() +
      " días sobre el alojamiento " +
      reserva.getAlojamientoNombre() +
      ".";
    const notificacion = new Notificacion(
      mensaje,
      reserva.getAnfitrionAlojamiento()
    );
    console.log(notificacion);
    return notificacion;
  }

  crearSegunAceptar(reserva) {
   let  mensaje =
      "El anfitrión de la reserva " +
      reserva.getAlojamientoNombre() +
      " ha aceptado su solicitud de reserva.";
    const notificacion = new Notificacion(
      mensaje,
      reserva.getHuespedReservador()
    );
    return notificacion;
  }
  crearSegunRechazo(reserva, motivoCancelacion = null) {
    mensaje =
      "El cliente " +
      reserva.getHuespedReservadorNombre() +
      " ha cancelado su reserva sobre " +
      reserva.getAlojamientoNombre();
    if (motivoCancelacion) {
      mensaje += " debido al siguiente motivo: '" + motivoCancelacion + "'.";
    }
    const notificacion = new Notificacion(
      mensaje,
      reserva.getAnfitrionAlojamiento()
    );
    return notificacion;
  }
  crearSegunCancelacion(reserva, usuarioCancelador, motivoCancelacion = null) {
    let mensaje = `Tu reserva sobre el alojamiento "${reserva.alojamiento.nombre}" ha sido cancelada.`;

    if (motivoCancelacion) {
      mensaje += ` Motivo: "${motivoCancelacion}".`;
    }

    return new Notificacion(
      mensaje,
        reserva.alojamiento.anfitrion
    );
  }
}
