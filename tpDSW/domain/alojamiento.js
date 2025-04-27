import { DOLAR_USA, Moneda } from "./moneda.js"
import { Reserva , RangoFechas } from "./reserva.js"
import { Foto } from "./foto.js"

export class Alojamiento{
    anfitrion
    nombre
    descripcion
    precioPorNoche
    moneda
    horarioCheckIn
    horarioCheckOut
    direccion
    cantHuespedesMax
    caracteristicas
    reservas
    fotos
    constructor(anfitrion, nombre, direccion){
        this.anfitrion = anfitrion;
        this.nombre = nombre;
        this.descripcion = "";
        this.precioPorNoche = 0;
        this.moneda = Moneda.DOLAR_USA; //MONEDA DEFAULT
        this.horarioCheckIn = "";
        this.horarioCheckOut = "";
        this.direccion = direccion;
        this.cantHuespedesMax = 5; //CANTIDAD DEFAULT QUE SE PUEDE SETEAR
        this.caracteristicas = []
        this.reservas = []
        this.fotos = []
    }
    estasDisponibleEn(rangoDeFechas){
        this.reservas.some(reserva => rangoFechaEstaEntre(rangoDeFechas, reserva.rangoFechas))
    }

    rangoFechaEstaEntre(rangoDeFechas1, rangoDeFechas2){
        fechaInicialCumple = fechaEstaEntre(rangoDeFechas1.fechaInicio, rangoDeFechas2.fechaFin, rangoDeFechas2.fechaFin)
        fechaFinalCumple = fechaEstaEntre(rangoDeFechas1.fechaFin, rangoDeFechas2.fechaFin, rangoDeFechas2.fechaFin)
        return fechaInicialCumple && fechaFinalCumple
    }

    fechaEstaEntre(fecha, fechaInicio, fechaFinal){
        return fecha > fechaInicio && fecha < fechaFinal
    }

    tuPrecioEstaDentroDe(valorMinimo, valorMaximo){
        return (valorMinimo < this.precioPorNoche && valorMaximo > this.precioPorNoche);
    }
    tenesCaracteristica(caracteristica){
        return this.caracteristicas.includes(caracteristica);
    }
    puedenAlojarse(cantHuespedes){
        return cantHuespedes <= this.cantHuespedesMax;
    }
    getNombre(){return this.nombre}
    getAnfitrion() {
        return this.anfitrion
    }
}
export class Direccion{
    calle
    altura
    ciudad
    lat
    long

    constructor(calle, altura, ciudad, lat, long){
        this.calle = calle;
        this.altura = altura;
        this.ciudad = ciudad;
        this.lat = lat;
        this.long = long;
    }
}
export class Ciudad{
    nombre
    pais
    constructor(nombre, pais){
        this.nombre = nombre;
        this.pais = pais;
    }
}
export class Pais{
    nombre
    constructor(nombre){
        this.nombre = nombre;
    }
}
