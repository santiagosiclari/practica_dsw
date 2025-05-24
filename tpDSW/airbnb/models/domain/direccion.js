import { Ciudad } from "./ciudad.js"

export class Direccion{
    calle
    altura
    ciudad
    lat
    long

    constructor(calle, altura, ciudad, lat, long){
        this.calle = calle;
        this.altura = altura;
        this.ciudad = new Ciudad(ciudad.nombre, ciudad.pais)
        this.lat = lat;
        this.long = long;
    }
}