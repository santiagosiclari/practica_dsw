export class Usuario{
    _id
    nombre
    email
    tipo
    constructor(nombre, email, tipo){
        this.nombre = nombre;
        this.email = email;
        this.tipo = tipo;
    }
    getId(){return this._id}
    setId(id){this._id = id}
    getNombre(){return this.nombre}
    getEmail(){return this.email}
    getTipo(){return this.tipo}
}

export class TipoUsuario{
    nombre
    constructor(nombre){
        this.nombre = nombre;
    }
}
export const ANFITRION = new TipoUsuario('ANFITRION');
export const HUESPED = new TipoUsuario('HUESPED');