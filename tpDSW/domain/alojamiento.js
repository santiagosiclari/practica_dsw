import { DOLAR_USA, Moneda } from "./moneda.js"
import { Reserva , RangoFechas } from "./reserva.js"
import { Foto } from "./foto.js"
import { Direccion } from "./direccionn.js"

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
        this.direccion =  new Direccion();  //Lo dejamos vacio se define al momento que hagamos la creación como lo parseamos
        this.cantHuespedesMax = 5; //CANTIDAD DEFAULT QUE SE PUEDE SETEAR
        this.caracteristicas = []
        this.reservas = []
        this.fotos = []
    }
    estasDisponibleEn(rangoDeFechas){
        this.reservas.some(reserva => this.rangoFechaEstaEntre(rangoDeFechas, reserva.rangoFechas))
    }

    rangoFechaEstaEntre(rangoDeFechas1, rangoDeFechas2){
        return rangoDeFechas1.seSuperponeCon(rangoDeFechas1)


        fechaInicialCumple = this.fechaEstaEntre(rangoDeFechas1.fechaInicio, rangoDeFechas2.fechaFin, rangoDeFechas2.fechaFin)
        fechaFinalCumple = this.fechaEstaEntre(rangoDeFechas1.fechaFin, rangoDeFechas2.fechaFin, rangoDeFechas2.fechaFin)
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
