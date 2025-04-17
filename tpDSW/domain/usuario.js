export class Usuario{
    nombre
    email
    tipo
    constructor(nombre, email, tipo){
        this.nombre = nombre;
        this.email = email;
        this.tipo = tipo;
    }
}

export class TipoUsuario{
    nombre
    constructor(nombre){
        this.nombre = nombre;
    }
}
export const ANFITRION = new TipoUsuario('ANFITRION');
export const HUESPED = new TipoUsuario('HUESPED');