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

    marcarComoLeida(filters) {

    }
}