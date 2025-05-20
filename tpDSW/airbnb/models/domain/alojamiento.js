import { DOLAR_USA, Moneda } from "./moneda.js"
import { Reserva , RangoFechas } from "./reserva.js"
import { Foto } from "./foto.js"
import { Direccion } from "./direccion.js"

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
        this.precioPorNoche = 0;
        this.moneda = Moneda.DOLAR_USA;
        this.direccion = direccion;
        this.cantHuespedesMax = 5;
        this.caracteristicas = [];
        this.reservas = [];
        this.fotos = [];
    }
    estasDisponibleEn(rangoDeFechas){
        return this.reservas.every(reserva =>
            !reserva.rangoFechas.seSuperponeCon(rangoDeFechas)
        );
    }

    tuPrecioEstaDentroDe(valorMinimo, valorMaximo){
        return this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo;
    }

    tenesCaracteristica(caracteristica){
        return this.caracteristicas.includes(caracteristica);
    }

    puedenAlojarse(cantHuespedes){
        return cantHuespedes <= this.cantHuespedesMax;
    }

    getNombre(){ return this.nombre; }
    getAnfitrion(){ return this.anfitrion; }
}
