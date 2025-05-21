import { RangoFechas, Reserva , CambioEstadoReserva, CANCELADA, CONFIRMADA, PENDIENTE} from "../models/domain/reserva.js";
import { AppError, ValidationError, NotFoundError, ConflictError, NoPermitoCambioEstadoReservaError } from "../errors/appError.js";
import { AlojamientoOcupadoError } from "../models/domain/errors/alojamientoOcupadoError.js";
import { AlojamientoSobrepasadoError } from "../models/domain/errors/alojamientoSobrepasado.js";
import { docToReserva } from "../models/schemas/reservaSchema.js";
import { Alojamiento } from "../models/domain/alojamiento.js";

export class ReservaService {
    constructor(reservaRepository, alojamientoRepository, userRepository) {
        this.reservaRepository = reservaRepository,
        this.alojamientoRepository = alojamientoRepository,
        this.userRepository = userRepository
    }

    async crearReserva(reserva) {
        if (!reserva.huespedReservador || typeof reserva.cantHuespedes !== "number" || !reserva.alojamiento || !reserva.fechaInicio || !reserva.fechaFinal) {
            throw new ValidationError('Faltan campos requeridos o son inválidos');
        }
        const { huespedReservador, cantHuespedes, alojamiento, rangoFechas } = await this.fromDto(reserva)

        const nueva = new Reserva(huespedReservador, cantHuespedes, alojamiento, rangoFechas)
        const reservaGuardada = await this.reservaRepository.save(nueva)

        //TODO: hacerlo en un alojamiento service
        alojamiento.agregarReserva(reservaGuardada);
        await this.alojamientoRepository.save(alojamiento);
        //TODO CREAR NOTIFICACION
        return reservaGuardada
    }

    async cancelarReserva(cambioEstado) {
          if (!cambioEstado.motivo || !cambioEstado.usuario || !cambioEstado.estado || !cambioEstado.reserva) {
             throw new ValidationError('Faltan campos requeridos o son inválidos');
         }
         
        const { estado, reserva, motivo, usuario } = await this.fromDtoCambio(cambioEstado);

        if (reserva.getRangoFechaInicio() <= new Date()) {
            throw new NoPermitoCambioEstadoReservaError("La reserva superó la fecha límite para ser cancelada");
        }

        const cambio = new CambioEstadoReserva(estado, reserva, motivo, usuario);

        reserva.actualizarEstado(cambio.estado);
        const reservaGuardada = await this.reservaRepository.save(reserva);
        // TODO SI ALCANZA EL TIEMPO: const cambioGuardado = await this.cambioEstadoRepository.save() para trazabilidad
        return reservaGuardada
}

    async modificarReserva(modificacion) {
        const reserva = await this.reservaRepository.findById(modificacion.reserva);
        const alojamiento = await this.alojamientoRepository.findById(reserva.alojamiento);

        const quiereModificarCant = modificacion.cantHuespedes !== undefined;
        const quiereModificarFechas = modificacion.fechaInicio !== undefined || modificacion.fechaFinal !== undefined;

        if (!quiereModificarCant && !quiereModificarFechas) {
            throw new ValidationError('Debe especificar al menos un campo a modificar');
        }

        // Validar fechas: si viene solo una, es error
        if ((modificacion.fechaInicio && !modificacion.fechaFinal) || (!modificacion.fechaInicio && modificacion.fechaFinal)) {
            throw new ValidationError('Para modificar fechas deben enviarse fechaInicio y fechaFinal juntas');
        }

        // Modificar cantidad de huéspedes
        if (quiereModificarCant) {
            const { cantHuespedes } = this.fromDtoModCant(modificacion);
            if (!alojamiento.puedenAlojarse(cantHuespedes)) {
                throw new AlojamientoSobrepasadoError("Se ha sobrepasado la cantidad de huésped máxima", 406);
            }
            reserva.setCantHuespedes(cantHuespedes);
        }

         // Modificar rango de fechas
        if (modificacion.fechaInicio && modificacion.fechaFinal) {
            const { rangoFechas } = await this.fromDtoModFecha(modificacion, alojamiento);
            reserva.setRangoFecha(rangoFechas);
        }
        return await this.reservaRepository.save(reserva);
    }

    async listarReservas() {
        const reservas = await this.reservaRepository.findAll();
        return reservas
    }

    async listarReservasUsuario(idUsuario) {
        const reservas = await this.reservaRepository.obtenerReservas(idUsuario);
        return reservas
    }

    async buscarReserva(idReserva) {
        const reservaEncontrada = await this.reservaRepository.findById(idReserva);
        if (!reservaEncontrada) {
            throw new NotFoundError(`Reserva con id ${id} no encontrado`);
        }
        return reservaEncontrada;
    }

    async fromDto(reservaDto) {
        const fechaInicio = new Date(reservaDto.fechaInicio);
        const fechaFinal = new Date(reservaDto.fechaFinal);

        const reservasExistente = await this.reservaRepository.findFechaCoincidente(fechaInicio, fechaFinal, reservaDto.alojamiento)
        if(reservasExistente){
            throw new AlojamientoOcupadoError('Ya hay una reserva en este rango de fechas', 403)
        }

        return {
            huespedReservador: await this.userRepository.findById(reservaDto.huespedReservador),
            cantHuespedes: reservaDto.cantHuespedes,
            alojamiento: await this.alojamientoRepository.findById(reservaDto.alojamiento),
            rangoFechas: new RangoFechas(fechaInicio, fechaFinal)
        }
    }

    async fromDtoCambio(dto) {
        const usuarioEncontrado = await this.userRepository.findById(dto.usuario);
        const reservaEncontrada = await this.reservaRepository.findById(dto.reserva);
        return {
            estado : this.matchearEstado(dto.estado),
            reserva : reservaEncontrada,
            motivo: dto.motivo,
            usuario: usuarioEncontrado
        };
    }
    fromDtoModCant(dto){
        return{
            cantHuespedes: dto.cantHuespedes
        }
    }
    async fromDtoModFecha(dto, alojamiento){
        const fechaInicio = new Date(dto.fechaInicio);
        const fechaFinal = new Date(dto.fechaFinal);
        
        const reservasExistente = await this.reservaRepository.findFechaCoincidente(fechaInicio, fechaFinal, alojamiento)
        if(reservasExistente){
            throw new AlojamientoOcupadoError('Ya hay una reserva en este rango de fechas', 403)
        }

        return{
            rangoFechas: new RangoFechas(fechaInicio, fechaFinal)
        }
    }

    matchearEstado(estadoDto) {
        if (estadoDto === 'CANCELADA'){
            return CANCELADA;
        } else if (estadoDto === 'CONFIRMADA') {
            return CONFIRMADA;
        } else if (estadoDto === 'PENDIENTE') {
            return PENDIENTE;
        } else {
            throw new ValidationError();
        }
    }

}