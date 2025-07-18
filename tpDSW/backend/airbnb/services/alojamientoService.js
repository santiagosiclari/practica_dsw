import { AppError, ValidationError, NotFoundError, ConflictError, NoPermitoCambioEstadoReservaError } from "../errors/appError.js";
import { RangoFechas } from "../models/domain/reserva.js";
import { WIFI, PISCINA, MASCOTAS_PERMITIDAS, ESTACIONAMIENTO } from '../models/domain/caracteristica.js';


export class AlojamientoService {
    constructor(alojamientoRepository) {
        this.alojamientoRepository = alojamientoRepository
    }

    async obtenerAlojamiento(id) {
        const alojamiento = await this.alojamientoRepository.findById(id);
        if (!alojamiento) {
            throw new NotFoundError(`Alojamiento con id ${id} no encontrado`);
        }
        return alojamiento;
    }

    async listarAlojamientos(filters, page, limit) {
        const parametros = this.fromDto(filters);
        const alojamientos = await this.alojamientoRepository.buscarConFiltros(parametros, page, limit);
        const total = alojamientos.total;

        //Filtramos usando la logica de dominio
        const resultAlojamientos = this.filtrarResultado(parametros, alojamientos)

        if (resultAlojamientos.length === 0) {
            throw new NotFoundError('No se encontraron alojamientos con estos filtros');
        }
        return {
            total,
            page,
            limit,
            resultAlojamientos
        };
    }
    fromDto(dto) {
        return {
            ciudad: dto.ciudad,
            pais: dto.pais,
            precioMin: dto.precioMin,
            precioMax: dto.precioMax,
            cantHuespedes: dto.cantHuespedes,
            caracteristicas: dto.caracteristicas?.length ? this.matchearCaracteristica(dto.caracteristicas) : [],
            rangoFechas: new RangoFechas(dto.fechaInicio, dto.fechaFinal)
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
    filtrarResultado(parametros, resultados){
        const alojamientos = resultados.alojamientos
        return alojamientos.filter(alojamiento => alojamiento.estasDisponibleEn(parametros.rangoFechas));
    }
}