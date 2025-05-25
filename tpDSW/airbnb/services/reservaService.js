import {
  RangoFechas,
  Reserva,
  CambioEstadoReserva,
  CANCELADA,
  CONFIRMADA,
  PENDIENTE, EstadoReserva,
} from "../models/domain/reserva.js";
import {
  AppError,
  ValidationError,
  NotFoundError,
  ConflictError,
  NoPermitoCambioEstadoReservaError,
} from "../errors/appError.js";
import { AlojamientoOcupadoError } from "../models/domain/errors/alojamientoOcupadoError.js";
import { AlojamientoSobrepasadoError } from "../models/domain/errors/alojamientoSobrepasado.js";
import { docToReserva } from "../models/schemas/reservaSchema.js";
import { Alojamiento } from "../models/domain/alojamiento.js";
import { NotificacionService } from "./notificacionService.js";
import { FactoryNotificacion } from "../models/domain/notificacion.js";
import { iniciarTareaChecks } from "../tasks/notificacionTasks.js";

export class ReservaService {
  constructor(reservaRepository, alojamientoRepository, userRepository, notificacionService) {
    this.reservaRepository = reservaRepository;
    this.alojamientoRepository = alojamientoRepository;
    this.userRepository = userRepository;
    this.notificacionService = notificacionService;
    this.factoryNotificacion = new FactoryNotificacion(); // ¡IMPORTANTE!: crear una instancia
  }


  async crearReserva(reserva) {
    if (
      !reserva.huespedReservador ||
      typeof reserva.cantHuespedes !== "number" ||
      !reserva.alojamiento ||
      !reserva.fechaInicio ||
      !reserva.fechaFinal
    ) {
      throw new ValidationError("Faltan campos requeridos o son inválidos");
    }
    const { huespedReservador, cantHuespedes, alojamiento, rangoFechas } =
      await this.fromDto(reserva);

    const nueva = new Reserva(
      huespedReservador,
      cantHuespedes,
      alojamiento,
      rangoFechas
    );
    new FactoryNotificacion().crearSegunReserva(nueva)
    const reservaGuardada = await this.reservaRepository.save(nueva);

    alojamiento.agregarReserva(reservaGuardada);
    await this.alojamientoRepository.save(alojamiento);
    //TODO CREAR NOTIFICACION
    return reservaGuardada;
  }

  async cambiarEstados(cambioEstado) {
    if (
      !cambioEstado.motivo ||
      !cambioEstado.usuario ||
      !cambioEstado.estado ||
      !cambioEstado.reserva
    ) {
      throw new ValidationError("Faltan campos requeridos o son inválidos");
    }
    switch (cambioEstado.estado) {
      case 'CANCELADA':
        return await this.cancelarReserva(cambioEstado);
      case 'CONFIRMADA':
        return await this.confirmarReserva(cambioEstado);
      case 'RECHAZADA':
        return await this.rechazarReserva(cambioEstado);

      default:
        throw new ValidationError(
          `Estado "${cambioEstado.estado}" no es válido o no está soportado.`
        );
    }
  }
  async cancelarReserva(cambioEstado) {
    return this._procesarCambioEstado(cambioEstado, EstadoReserva.CANCELADA);
  }

  async confirmarReserva(cambioEstado) {
    return this._procesarCambioEstado(cambioEstado, EstadoReserva.CONFIRMADA);
  }
  async rechazarReserva(cambioEstado) {
    return this._procesarCambioEstado(cambioEstado, EstadoReserva.RECHAZADA);
  }

  async _procesarCambioEstado(cambioEstado, tipo) {
    const { estado, reserva, motivo, usuario } = await this.fromDtoCambio(
      cambioEstado
    );

    this._validarCambioEstado(tipo, reserva);

    const cambio = new CambioEstadoReserva(estado, reserva, motivo, usuario);
    reserva.actualizarEstado(cambio.estado);

    const reservaGuardada = await this.reservaRepository.save(reserva);

    /*let notificacion;

    switch (tipo) {
      case "CONFIRMADA":
        notificacion = this.factoryNotificacion.crearSegunAceptar(reserva);
        break;
      case "CANCELADA":
        notificacion = this.factoryNotificacion.crearSegunCancelacion(
          reserva,
          usuario,
          motivo
        );
        break;
      case "RECHAZADA":
        notificacion = this.factoryNotificacion.crearSegunRechazo(
          reserva,
          motivo
        );
        break;
      default:
        break;
    }
    if (notificacion) {
      await this.notificacionService.crearNotificacion({
        mensaje: notificacion.mensaje,
        usuario: notificacion.usuario,
      });
    }*/

    return reservaGuardada;
  }

  _validarCambioEstado(tipo, reserva) {
    const fechaActual = new Date();

    if (reserva.getRangoFechaInicio() <= fechaActual) {
      if (tipo === EstadoReserva.CANCELADA) {
        throw new NoPermitoCambioEstadoReservaError(
          "La reserva superó la fecha límite para ser cancelada"
        );
      }
    }
  }
  async modificarReserva(modificacion) {
    const reserva = await this.reservaRepository.findById(modificacion.reserva);
    const alojamiento = await this.alojamientoRepository.findById(
      reserva.alojamiento
    );

    const quiereModificarCant = modificacion.cantHuespedes !== undefined;
    const quiereModificarFechas =
      modificacion.fechaInicio !== undefined ||
      modificacion.fechaFinal !== undefined;

    if (!quiereModificarCant && !quiereModificarFechas) {
      throw new ValidationError(
        "Debe especificar al menos un campo a modificar"
      );
    }

    // Validar fechas: si viene solo una, es error
    if (
      (modificacion.fechaInicio && !modificacion.fechaFinal) ||
      (!modificacion.fechaInicio && modificacion.fechaFinal)
    ) {
      throw new ValidationError(
        "Para modificar fechas deben enviarse fechaInicio y fechaFinal juntas"
      );
    }

    // Modificar cantidad de huéspedes
    if (quiereModificarCant) {
      const { cantHuespedes } = this.fromDtoModCant(modificacion);
      if (!alojamiento.puedenAlojarse(cantHuespedes)) {
        throw new AlojamientoSobrepasadoError(
          "Se ha sobrepasado la cantidad de huésped máxima",
          406
        );
      }
      reserva.setCantHuespedes(cantHuespedes);
    }

    // Modificar rango de fechas
    if (modificacion.fechaInicio && modificacion.fechaFinal) {
      const { rangoFechas } = await this.fromDtoModFecha(
        modificacion,
        alojamiento
      );
      reserva.setRangoFecha(rangoFechas);
    }
    return await this.reservaRepository.save(reserva);
  }

  async listarReservas() {
    const reservas = await this.reservaRepository.findAll();
    return reservas;
  }

  async listarReservasUsuario(idUsuario) {
    const reservas = await this.reservaRepository.obtenerReservas(idUsuario);
    return reservas;
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

    const reservasExistente = await this.reservaRepository.findFechaCoincidente(
      fechaInicio,
      fechaFinal,
      reservaDto.alojamiento
    );
    if (reservasExistente) {
      throw new AlojamientoOcupadoError(
        "Ya hay una reserva en este rango de fechas",
        403
      );
    }

    return {
      huespedReservador: await this.userRepository.findById(
        reservaDto.huespedReservador
      ),
      cantHuespedes: reservaDto.cantHuespedes,
      alojamiento: await this.alojamientoRepository.findById(
        reservaDto.alojamiento
      ),
      rangoFechas: new RangoFechas(fechaInicio, fechaFinal),
    };
  }

  async obtenerReservasProximas() {
    const hoy = new Date();
    return await this.reservaRepository.findReservasProximas(hoy, 1); // próximas 24hs
  }
  async obtenerReservasPorFinalizar() {
    const hoy = new Date();
    return await this.reservaRepository.findReservasPorFinalizar(hoy, 1);
  }
  async fromDtoCambio(dto) {
    const usuarioEncontrado = await this.userRepository.findById(dto.usuario);
    const reservaEncontrada = await this.reservaRepository.findById(
      dto.reserva
    );
    return {
      estado: dto.estado,
      reserva: reservaEncontrada,
      motivo: dto.motivo,
      usuario: usuarioEncontrado,
    };
  }
  fromDtoModCant(dto) {
    return {
      cantHuespedes: dto.cantHuespedes,
    };
  }
  async fromDtoModFecha(dto, alojamiento) {
    const fechaInicio = new Date(dto.fechaInicio);
    const fechaFinal = new Date(dto.fechaFinal);

    const reservasExistente = await this.reservaRepository.findFechaCoincidente(
      fechaInicio,
      fechaFinal,
      alojamiento
    );
    if (reservasExistente) {
      throw new AlojamientoOcupadoError(
        "Ya hay una reserva en este rango de fechas",
        403
      );
    }

    return {
      rangoFechas: new RangoFechas(fechaInicio, fechaFinal),
    };
  }

  matchearEstado(estadoDto) {
    if (estadoDto === "CANCELADA") {
      return CANCELADA;
    } else if (estadoDto === "CONFIRMADA") {
      return CONFIRMADA;
    } else if (estadoDto === "PENDIENTE") {
      return PENDIENTE;
    } else {
      throw new ValidationError();
    }
  }
}
