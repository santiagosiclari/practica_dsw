import { Notificacion } from "../models/domain/notificacion.js";

export class NotificacionService {
  constructor(notificacionRepository, userRepository) {
    this.notificacionRepository = notificacionRepository;
    this.userRepository = userRepository;
  }

  async crearNotificacion(notificacion) {
    return await this.notificacionRepository.save(notificacion);
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
    return await this.notificacionRepository.findAll(filters);
  }

  async marcarComoLeida(parametros) {
    const update = {
      leida: parametros.leida,
    };
    update.fechaLeida = new Date();
    return await this.notificacionRepository.actualizarEstado(
        parametros.notificacion,
        parametros.usuario,
        update
    );
  }
}
