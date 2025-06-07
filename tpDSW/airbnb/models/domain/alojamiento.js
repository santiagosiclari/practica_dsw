import { DOLAR_USA, Moneda } from "./moneda.js"
import { Reserva , RangoFechas } from "./reserva.js"
import { Foto } from "./foto.js"
import { Direccion } from "./direccion.js"

export class Alojamiento{
    _id
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
        this.direccion = new Direccion(direccion.calle, direccion.altura, direccion.ciudad, direccion.lat,direccion.long);
        this.cantHuespedesMax = 5;
        this.caracteristicas = [];
        this.reservas = [];
        this.fotos = [];
    }
    setId(id) {
        this._id = id;
    }
    getId(){
        return this._id;
    }
    estasDisponibleEn(rangoDeFechas){
        console.log('Reservas del alojamiento:', this.reservas);
        this.reservas.forEach((r, i) => {
        console.log(`Reserva #${i}:`, r);
        console.log(`Tiene método seSuperponeCon:`, typeof r?.seSuperponeCon === 'function');
        });
        return this.reservas.every(reserva =>
            !reserva.seSuperponeCon(rangoDeFechas)
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
    getPrecioPorNoche() {
        return this.precioPorNoche;
    }

    async agregarReserva(reserva) {
        if (!this.reservas) {
            this.reservas = [];
        }

        // Si la reserva es una instancia de Reserva, guardamos solo su _id
        // Si la reserva es el id directamente, lo usamos tal cual
        const reservaId = reserva._id ? reserva._id : reserva;
        this.reservas.push(reservaId);

        // Guardar los cambios usando Mongoose (this es el documento mongoose)
        return await this.save();
    }
}
