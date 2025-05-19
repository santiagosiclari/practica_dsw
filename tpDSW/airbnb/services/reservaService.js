import { CANCELADA, RangoFechas, Reserva , CambioEstadoReserva} from "../models/domain/reserva.js";
import { AppError, ValidationError, NotFoundError, ConflictError } from "../errors/appError.js";

export class ReservaService {
    constructor(reservaRepository, alojamientoRepository, userRepository) {
        this.reservaRepository = reservaRepository,
        this.alojamientoRepository = alojamientoRepository,
        this.userRepository = userRepository
    }

    crearReserva(reserva) {
        if (!reserva.huespedReservador || typeof reserva.cantHuespedes !== "number" || !reserva.alojamiento || !reserva.fechaInicio || !reserva.fechaFinal) {
            throw new ValidationError('Faltan campos requeridos o son inválidos');
        }
        const { huespedReservador, cantHuespedes, alojamiento, rangoFechas } = this.fromDto(reserva)
        const nueva = new Reserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas)
        const reservaGuardada = this.reservaRepository.agregarReserva(nueva)
        //TODO CREAR NOTIFICACION
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

    listarReservas() {
        const reservas = this.reservaRepository.findAll();
        return reservas
    }

    listarReservasUsuario(idUsuario) {
        const reservas = this.reservaRepository.obtenerReservas(idUsuario);
        return reservas
    }

    buscarReserva(idReserva) {
        const reservaEncontrada = this.reservaRepository.findById(Number(idReserva));
        return reservaEncontrada;
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