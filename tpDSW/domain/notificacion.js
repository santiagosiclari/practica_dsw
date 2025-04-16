export class Notificacion{
    constructor(mensaje, usuario, fechaAlta, leida, fechaLeida){
        this.mensaje = mensaje;
        this.usuario = usuario;
        this.fechaAlta = fechaAlta;
        this.leida = leida;
        this.fechaLeida = fechaLeida;
    }
    marcarComoLeida(){
        this.leida = true;
    }
}
export class FactoryNotificacion{
    crearSegunReserva(reserva){
        //obtiene reserva y devuelve notificacion
        const notificacion = new Notificacion("Aviso de notificacion",reserva.huespedReservador, reserva.fechaAlta, false, null);
    }
}