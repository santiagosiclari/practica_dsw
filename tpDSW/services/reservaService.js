import { RangoFechas, Reserva } from "../domain/reserva.js";

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
        return this.toDto(reservaGuardada) //TODO: toDTO
    }

    toDto(reserva) {
        return {
          id: reserva.id,
          fechaAlta: reserva.fechaAlta.toDateString(),
          huespedReservador: reserva.getHuespedReservadorId(),
          cantHuespedes: reserva.getCantHuespedes(),
          alojamiento: reserva.getAlojamientoId(),
          fechaInicio: reserva.getRangoFechaInicioString(),
          fechaFinal: reserva.getRangoFechaFinalString(),
          precioPorNoche: reserva.getPrecioPorNoche()
        }
    }

    fromDto(reservaDto) {
        return {
            huespedReservador: this.userRepository.findById(reservaDto.huespedId),
            cantHuespedes: reservaDto.cantHuespedes,
            alojamiento: this.alojamientoRepository.findById(reservaDto.alojamientoId),
            rangoFechas: new RangoFechas(Date.parse(reservaDto.fechaInicio), Date.parse(reservaDto.fechaFinal))
        }
    }
}