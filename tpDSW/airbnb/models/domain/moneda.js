export class Moneda{
    nombre;
    constructor(nombre){
        this.nombre = nombre;
    }
}
export const DOLAR_USA = new Moneda('DOLAR_USA');
export const PESO_ARG = new Moneda('PESO_ARG');
export const REALES = new Moneda('REALES');