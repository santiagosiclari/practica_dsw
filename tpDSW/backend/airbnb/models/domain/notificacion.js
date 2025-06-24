export class Notificacion {
  _id
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
  getId() {
    return this._id;
  }
  setId(id) {
    this._id = id;
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
    return new Notificacion(
        mensaje,
        reserva.getAnfitrionAlojamiento()
    );
  }
  crearSegunAceptar(reserva) {
    let  mensaje =
        "El anfitrión de la reserva " +
        reserva.getId() +
        " ha aceptado su solicitud de reserva.";
    return new Notificacion(
        mensaje,
        reserva.getHuespedId()
    );
  }
  crearSegunRechazo(reserva, motivoCancelacion = null) {
    let mensaje =
        "El cliente " +
        reserva.getHuespedNombre() +
        " ha rechazado su reserva sobre " +
        reserva.getAlojamientoNombre();
    if (motivoCancelacion) {
      mensaje += " debido al siguiente motivo: '" + motivoCancelacion + "'.";
    }
    return new Notificacion(
        mensaje,
        reserva.getAnfitrionAlojamiento()
    );
  }
  crearSegunCancelacion(reserva, usuarioCancelador, motivoCancelacion = null) {
    let mensaje = `Tu reserva sobre el alojamiento "${reserva.getAlojamientoNombre()}" ha sido cancelada.`;

    if (motivoCancelacion) {
      mensaje += ` Motivo: "${motivoCancelacion}".`;
    }
    return new Notificacion(
        mensaje,
        reserva.getAnfitrionAlojamiento()
    );
  }
}