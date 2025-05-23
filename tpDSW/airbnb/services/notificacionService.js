export class NotificacionService {
  constructor(notificacionRepository, userRepository) {
    this.notificacionRepository = notificacionRepository;
    this.userRepository = userRepository;
  }

  async crearNotificacion({ mensaje, usuario }) {
    const noti = new Notificacion(mensaje, usuario);
    return await this.notificacionRepository.save(noti);
  }

 async enviarNotificacionCheck() {
  const reservasProximas = await this.reservaService.obtenerReservasProximas(); // <--- LLAMADA

  for (const reserva of reservasProximas) {
    const mensaje = `Tu reserva en "${reserva.getAlojamientoNombre()}" comienza el ${reserva.getRangoFechaInicio().toLocaleDateString()}. ¡Prepará las valijas!`;

    await this.crearNotificacion({
      mensaje,
      usuario: reserva.getHuespedId(),
    });
  }
}
async enviarNotificacionCheckout() {
  const reservasPorFinalizar = await this.reservaService.obtenerReservasPorFinalizar();

  for (const reserva of reservasPorFinalizar) {
    const mensaje = `Tu estadía en "${reserva.getAlojamientoNombre()}" termina el ${reserva.getRangoFechaFinal().toLocaleDateString()}. ¡Esperamos que hayas disfrutado!`;

    await this.crearNotificacion({
      mensaje,
      usuario: reserva.getHuespedId(),
    });
  }
}
  async listarNotificaciones(filters) {
    const notificaciones = await this.notificacionRepository.findAll(filters);
    return notificaciones;
  }

  async marcarComoLeida({ notificacion, leida }) {
    const update = {
      leida: leida,
    };
    //  asignamos fechaLeida

    update.fechaLeida = new Date();

    return await this.notificacionRepository.actualizarEstado(
      notificacion,
      update
    );
  }
}
