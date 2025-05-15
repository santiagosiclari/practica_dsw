import { RangoFechas, Reserva } from "../models/domain/reserva.js";

export class ReservaService {
    constructor(reservaRepository, alojamientoRepository, userRepository) {
        this.reservaRepository = reservaRepository,
        this.alojamientoRepository = alojamientoRepository,
        this.userRepository = userRepository
    }

    crearReserva(reserva) {
        const { huespedReservador, cantHuespedes, alojamiento, rangoFechas } = this.fromDto(reserva)
        //TODO Hacer validaciones de cada atributo
        const nueva = new Reserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas)
        const reservaGuardada = this.reservaRepository.agregarReserva(nueva)
        return reservaGuardada
    }



    fromDto(reservaDto) {
        return {
            huespedReservador: this.userRepository.findById(reservaDto.huespedReservador),
            cantHuespedes: reservaDto.cantHuespedes,
            alojamiento: this.alojamientoRepository.findById(reservaDto.alojamiento),
            rangoFechas: new RangoFechas(Date.parse(reservaDto.fechaInicio), Date.parse(reservaDto.fechaFinal))
        }
    }
}