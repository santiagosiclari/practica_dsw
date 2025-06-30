import { Pais } from "./pais.js";

export class Ciudad{
    nombre
    pais
    constructor(nombre, pais){
        this.nombre = nombre.toLowerCase();
        this.pais = new Pais(pais.nombre);
    }
}
