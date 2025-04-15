export class Usuario{
    constructor(nombre, email, tipo){
        this.nombre = nombre;
        this.email = email;
        this.tipo = tipo;
    }
    cancelarReserva(){
        if(this.tipo == "HUESPED"){
            enviarMensajeAnfitrion();
        }
    }
    getTipo(){return this.tipo};
}

export const TipoUsuario = Object.freeze({
    HUESPED: 'HUESPED',
    ANFITRION: 'ANFITRION'
});