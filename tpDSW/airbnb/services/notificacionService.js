export class NotificacionService {
    constructor(notificacionRepository, userRepository) {
        this.notificacionRepository = notificacionRepository
        this.userRepository = userRepository
    }

    crearNotificacionPorConfirmacion(reserva) {

    }

    crearNotificacionRecordatorioCheck() {

    }

    crearNotificacionEstadoReserva() {

    }

    async listarNotificaciones(filters) {
        const notificaciones = await this.notificacionRepository.findAll(filters);
        return notificaciones;
    }

  async marcarComoLeida({ notificacion, leida }) {
    const update = {
        leida: leida
    };
    //  asignamos fechaLeida 
  
        update.fechaLeida = new Date();
    

    return await this.notificacionRepository.actualizarEstado(notificacion, update);
}
}