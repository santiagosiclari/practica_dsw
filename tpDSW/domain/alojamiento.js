export class Alojamiento{
    #anfitrion
    #nombre
    #descripcion
    #precioPorNoche
    #moneda
    #horarioCheckIn
    #horarioCheckOut
    #direccion
    #cantHuespedesMax
    #caracteristicas
    #reservas
    #fotos
    constructor(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantHuespedesMax, caracteristicas, reservas, fotos){
        this.#anfitrion = anfitrion;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#precioPorNoche = precioPorNoche;
        this.#moneda = moneda;
        this.#horarioCheckIn = horarioCheckIn;
        this.#horarioCheckOut = horarioCheckOut;
        this.#direccion = direccion;
        this.#cantHuespedesMax = cantHuespedesMax;
        this.#caracteristicas = caracteristicas;
        this.#reservas = reservas;
        this.#fotos = fotos;
    }
    get anfitrion(){return this.#anfitrion}
    get nombre(){return this.#nombre}
    get descripcion(){return this.#descripcion}
    get precioPorNoche(){return this.#precioPorNoche}
    get moneda(){return this.#moneda}
    get horarioCheckIn(){return this.#horarioCheckIn}
    get horarioCheckOut(){return this.#horarioCheckOut}
    get direccion(){return this.#direccion}
    get cantHuespedesMax(){return this.#cantHuespedesMax}
    get caracteristicas(){return this.#caracteristicas}
    get reservas(){return this.#reservas}
    get fotos(){return this.#fotos}

    estasDisponibleEn(rangoDeFechas){
    }
    tuPrecioEstaDentroDe(valorMinimo, valorMaximo){
        return valorMinimo < this.precioPorNoche && valorMaximo > this.precioPorNoche;
    }
    tenesCaracteristicas(caracteristica){
        return this.caracteristicas.includes(caracteristica, 0);
    }
    puedenAlojarse(cantHuespedes){
        return cantHuespedes <= this.cantHuespedesMax;
    }
}
export class Direccion{

    constructor(calle, altura, ciudad, lat, long){
        this.calle = calle;
        this.altura = altura;
        this.ciudad = ciudad;
        this.lat = lat;
        this.long = long;
    }
}
export class Ciudad{
    constructor(nombre, pais){
        this.nombre = nombre;
        this.pais = pais;
    }
}
export class Pais{
    constructor(nombre){
        this.nombre = nombre;
    }
}
