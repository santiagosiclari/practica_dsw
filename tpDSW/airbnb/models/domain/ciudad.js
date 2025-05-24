import { Pais } from "./pais.js";

export class Ciudad{
    nombre
    pais
    constructor(nombre, pais){
        this.nombre = nombre;
        this.pais = new Pais(pais.nombre);
    }
}
