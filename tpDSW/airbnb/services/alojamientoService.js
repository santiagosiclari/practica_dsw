import { AppError, ValidationError, NotFoundError, ConflictError, NoPermitoCambioEstadoReservaError } from "../errors/appError.js";
import { Alojamiento } from "../models/domain/alojamiento.js";
import { RangoFechas } from "../models/domain/reserva.js";
import { AlojamientoRepository } from "../models/repositories/alojamientoRepository.js";
import { WIFI, PISCINA, MASCOTAS_PERMITIDAS, ESTACIONAMIENTO } from '../models/domain/caracteristica.js';


export class AlojamientoService {
    constructor(reservaRepository, alojamientoRepository, userRepository) {
        this.reservaRepository = reservaRepository,
            this.alojamientoRepository = alojamientoRepository,
            this.userRepository = userRepository
    }

    async listarAlojamientos(filters, page, limit) {
        const parametros = this.fromDto(filters);
        const alojamientos = await this.alojamientoRepository.buscarConFiltros(parametros, page, limit);

        //Filtramos usando la logica de dominio
        //const resultAlojamientos = this.filtrarResultado(parametros, alojamientos)

        if (alojamientos.length === 0) {
            throw new NotFoundError('No se encontraron alojamientos con estos filtros');
        }
        return alojamientos;
    }
    fromDto(dto) {
        const fechaInicio = new Date(dto.fechaInicio);
        const fechaFinal = new Date(dto.fechaFinal);

        return {
            ciudad: dto.ciudad,
            pais: dto.pais,
            precioMin: dto.precioMin,
            precioMax: dto.precioMax,
            cantHuespedes: dto.cantHuespedes,
            caracteristicas: dto.caracteristicas?.length ? this.matchearCaracteristica(dto.caracteristicas) : [],
            rangoFechas: new RangoFechas(fechaInicio, fechaFinal)
        };
    }
    matchearCaracteristica(caracteristicasDto = []) {
        return caracteristicasDto.map(caracteristica => {
            const caracLimpia = caracteristica.trim().toUpperCase()
            if (
                caracLimpia === 'WIFI' ||
                caracLimpia === 'ESTACIONAMIENTO' ||
                caracLimpia === 'MASCOTAS_PERMITIDAS' ||
                caracLimpia === 'PISCINA'
            ) {
                return caracLimpia; // Retorna el string
            } else {
                throw new ValidationError('Característica inválida: ' + caracLimpia);
            }
        })
    }
}