import { AppError, ValidationError, NotFoundError, ConflictError, NoPermitoCambioEstadoReservaError } from "../errors/appError.js";
import { Alojamiento } from "../models/domain/alojamiento.js";
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
        if (alojamientos.length === 0) {
            throw new NotFoundError('No se encontraron alojamientos con estos filtros');
        }
        return alojamientos;
    }
    fromDto(dto) {
        return {
            ciudad: dto.ciudad,
            pais: dto.pais,
            precioMin: dto.precioMin,
            precioMax: dto.precioMax,
            cantHuespedes: dto.cantHuespedes,
            caracteristicas: this.matchearCaracteristica(dto.caracteristicas)
        };
    }
    matchearCaracteristica(caracteristicasDto) {
        return caracteristicasDto.map(caracteristica => {
            if (
                caracteristica === 'WIFI' ||
                caracteristica === 'ESTACIONAMIENTO' ||
                caracteristica === 'MASCOTAS_PERMITIDAS' ||
                caracteristica === 'PISCINA'
            ) {
                return caracteristica; // Retorna el string
            } else {
                throw new ValidationError('Característica inválida: ' + caracteristica);
            }
        })
    }
}
