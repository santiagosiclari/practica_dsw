import {
  RangoFechas,
  Reserva,
  CambioEstadoReserva,
  CANCELADA,
  CONFIRMADA,
  PENDIENTE, RECHAZADA, EstadoReserva
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
  constructor(reservaRepository, alojamientoRepository, userRepository, notificacionService, notificacionRepository, factoryNotificacion) {
    this.reservaRepository = reservaRepository;
    this.alojamientoRepository = alojamientoRepository;
    this.userRepository = userRepository;
    this.notificacionRepository = notificacionRepository;
    this.notificacionService = notificacionService;
    this.factoryNotificacion = factoryNotificacion;
  }

  async crearReserva(reserva, rangoFechas) {
    //const { huespedReservador, cantHuespedes, alojamiento } = reserva;
    const huespedReservador = reserva.huespedReservador;
    const cantHuespedes = reserva.cantHuespedes;
    const alojamiento = reserva.alojamiento;

    const huespedEncontrado = await this.userRepository.findById(huespedReservador);
    const alojamientoEncontrado = await this.alojamientoRepository.findById(alojamiento);

    const nueva = new Reserva(
      huespedEncontrado,
      cantHuespedes,
      alojamientoEncontrado,
      rangoFechas
    );
/*    console.log('rangoFechas recibido en crearReserva:', rangoFechas);
    console.log('Reserva creada:', nueva);*/

    const reservaGuardada = await this.reservaRepository.save(nueva);
    await alojamientoEncontrado.agregarReserva(reservaGuardada);
    await this.alojamientoRepository.save(alojamientoEncontrado);
    this.notificacionService.crearNotificacion(nueva.notificacionAlCrear())

    return reservaGuardada;
  }

  async cambiarEstados(cambioEstado) {
    const { estado, reserva, motivo, usuario } = cambioEstado;

    const usuarioEncontrado = await this.userRepository.findById(usuario);
    const reservaEncontrada = await this.reservaRepository.findById(reserva);

    const cambio = new CambioEstadoReserva(estado, reservaEncontrada, motivo, usuarioEncontrado);
    const notificacion = reservaEncontrada.actualizarEstado(cambio);
    const reservaGuardada = await this.reservaRepository.save(cambio.reserva);
    await this.notificacionService.crearNotificacion(notificacion);

    return reservaGuardada;
  }

  async modificarReserva(modificacion) {
    const {reserva, cantHuespedes, fechaInicio, fechaFinal} = modificacion;

    const reservaEncontrada = await this.reservaRepository.findById(reserva);

    const quiereModificarCant = cantHuespedes !== undefined;
    const quiereModificarFechas =
      fechaInicio !== undefined ||
      fechaFinal !== undefined;

    if (!quiereModificarCant && !quiereModificarFechas) {
      throw new ValidationError(
        "Debe especificar al menos un campo a modificar"
      );
    }

    // Validar fechas: si viene solo una, es error
    if (
      (fechaInicio && !fechaFinal) ||
      (!fechaInicio && fechaFinal)
    ) {
      throw new ValidationError("Para modificar fechas deben enviarse fechaInicio y fechaFinal juntas");
    }

    // Modificar cantidad de huéspedes
    if (quiereModificarCant) {
      reservaEncontrada.setCantHuespedes(cantHuespedes);
    }

    // Modificar rango de fechas
    if (fechaInicio && fechaFinal) {
      const rango = new RangoFechas(fechaInicio, fechaFinal);
      reservaEncontrada.setRangoFecha(rango);
    }

    return await this.reservaRepository.save(reservaEncontrada);
  }

  async listarReservas() {
    return await this.reservaRepository.findAll();
  }

  async listarReservasUsuario(idUsuario) {
    return await this.reservaRepository.obtenerReservas(idUsuario);
  }

  async buscarReserva(idReserva) {
    const reservaEncontrada = await this.reservaRepository.findById(idReserva);
    if (!reservaEncontrada) {
      throw new NotFoundError(`Reserva con id ${idReserva} no encontrado`);
    }
    return reservaEncontrada;
  }

  async validarReservaExistente(fechaInicio, fechaFinal, alojamiento) {
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
  }

  async obtenerReservasProximas() {
    const hoy = new Date();
    return await this.reservaRepository.findReservasProximas(hoy, 1); // próximas 24hs
  }
  async obtenerReservasPorFinalizar() {
    const hoy = new Date();
    return await this.reservaRepository.findReservasPorFinalizar(hoy, 1);
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
