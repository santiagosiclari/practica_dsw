import { CANCELADA, RangoFechas, Reserva , CambioEstadoReserva} from "../models/domain/reserva.js";
import { AppError, ValidationError, NotFoundError, ConflictError } from "../errors/appError.js";
import { AlojamientoOcupadoError } from "../models/domain/errors/alojamientoOcupadoError.js";
import { AlojamientoSobrepasadoError } from "../models/domain/errors/alojamientoSobrepasado.js";

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

    cancelarReserva(idReserva, cambioEstado) {
        if (!cambioEstado.motivo || typeof cambioEstado.usuario !== "number") {
            throw new ValidationError('Faltan campos requeridos o son inválidos');
        }
        const reserva = this.reservaRepository.findById(Number(idReserva));
        const { motivo, usuario } = this.fromDtoCambio(cambioEstado);

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

    modificarReserva(idReserva, modificacion) {
        const reserva = this.reservaRepository.findById(Number(idReserva));
        const alojamiento = this.alojamientoRepository.findById(reserva.getAlojamientoId());

        const quiereModificarCant = modificacion.cantHuespedes !== undefined;
        const quiereModificarFechas = modificacion.fechaInicio !== undefined || modificacion.fechaFinal !== undefined;

        if (!quiereModificarCant && !quiereModificarFechas) {
            throw new ValidationError('Debe especificar al menos un campo a modificar');
        }

        // Validar fechas: si viene solo una, es error
        if ((modificacion.fechaInicio && !modificacion.fechaFinal) || (!modificacion.fechaInicio && modificacion.fechaFinal)) {
            throw new ValidationError('Para modificar fechas deben enviarse fechaInicio y fechaFinal juntas');
        }

        // Convertir los datos de entrada
        const { cantHuespedes, rangoFechas } = this.fromDtoMod(modificacion);

        // Modificar cantidad de huéspedes
        if (quiereModificarCant) {
            if (!alojamiento.puedenAlojarse(cantHuespedes)) {
                throw new AlojamientoSobrepasadoError("Se ha sobrepasado la cantidad de huésped máxima", 406);
            }
            reserva.setCantHuespedes(cantHuespedes);
        }

        // Modificar rango de fechas
        if (modificacion.fechaInicio && modificacion.fechaFinal) {
            if (!alojamiento.estasDisponibleEn(rangoFechas)) {
                throw new AlojamientoOcupadoError("En este rango de fechas ya hay una reserva.", 406);
            }
            reserva.setRangoFecha(rangoFechas);
        }

        return this.reservaRepository.guardarReserva(reserva.getId(), reserva);
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
        const idUsuario = Number(dto.usuario);
        const usuario = this.userRepository.findById(idUsuario);

        return {
            motivo: dto.motivo,
            usuario
        };
    }
    fromDtoMod(dto){
        return{
            cantHuespedes: dto.cantHuespedes,
            rangoFechas: new RangoFechas(Date.parse(dto.fechaInicio), Date.parse(dto.fechaFinal))
        }
    }
}