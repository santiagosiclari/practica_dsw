export class Caracteristica{
    nombre
    constructor(nombre){
        this.nombre = nombre;
    }
}
export const WIFI = new Caracteristica('WIFI');
export const PISCINA = new Caracteristica('PISCINA');
export const MASCOTAS_PERMITIDAS = new Caracteristica('MASCOTAS_PERMITIDAS');
export const ESTACIONAMIENTO = new Caracteristica('ESTACIONAMIENTO');