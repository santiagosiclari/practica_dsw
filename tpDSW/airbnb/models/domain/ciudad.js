import { Pais } from "./pais.js";

export class Ciudad{
    nombre
    pais
    constructor(nombre, pais){
        this.nombre = nombre;
        this.pais = new Pais(); //Lo dejamos vacio se define al momento que hagamos la creación como lo parseamos
    }
}
