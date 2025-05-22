export class NotificacionService {
    constructor(notificacionRepository, userRepository) {
        this.notificacionRepository = notificacionRepository
        this.userRepository = userRepository
    }

   async crearNotificacion({ mensaje, usuario }) {
    const noti = new Notificacion(mensaje, usuario);
    return await this.notificacionRepository.save(noti);
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