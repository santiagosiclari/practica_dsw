import { CANCELADA, RangoFechas, Reserva , CambioEstadoReserva} from "../models/domain/reserva.js";

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
    cancelarReserva(cambioEstadoDto) {
        const { idReserva, reserva, motivo, usuario } = this.fromDtoCambio(cambioEstadoDto);

        //PROBAR DESPUES LAS FECHAS, NOC COMO SE ESCRIBEN CLANK
/*        const fechaAhora = new Date()
        if(reserva.comenzoReserva(fechaAhora)){
            console.log('Ya ha comenzado la reserva')
        }*/

        const cambio = new CambioEstadoReserva(CANCELADA, reserva, motivo, usuario);

        reserva.actualizarEstado(CANCELADA);
        if (!reserva.historialCambios) reserva.historialCambios = [];
        reserva.historialCambios.push(cambio);

        return this.reservaRepository.guardarReserva(idReserva, reserva);
    }
    listarReservas(idUsuario) {
        const reservas = this.reservaRepository.obtenerReservas(idUsuario);
        return reservas
    }

    fromDto(reservaDto) {
        return {
            huespedReservador: this.userRepository.findById(reservaDto.huespedReservador),
            cantHuespedes: reservaDto.cantHuespedes,
            alojamiento: this.alojamientoRepository.findById(reservaDto.alojamiento),
            rangoFechas: new RangoFechas(Date.parse(reservaDto.fechaInicio), Date.parse(reservaDto.fechaFinal))
        }
    }
    fromDtoCambio(dto) {
        const idReserva = Number(dto.reserva);
        const idUsuario = Number(dto.usuario);

        const reserva = this.reservaRepository.findById(idReserva);
        const usuario = this.userRepository.findById(idUsuario);

        return {
            idReserva,
            reserva,
            motivo: dto.motivo,
            usuario
        };
    }
}