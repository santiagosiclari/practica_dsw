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
        this.ciudad = new Ciudad()//Lo dejamos vacio se define al momento que hagamos la creación como lo parseamos;
        this.lat = lat;
        this.long = long;
    }
}