import { Alojamiento } from "../models/domain/alojamiento.js";

export class AlojamientoController {
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService
    }

    async listarAlojamientos(req, res, next) {
        try{
            const filters = {
                fechaInicio : req.query.fechaInicio,
                fechaFinal : req.query.fechaFinal,
                ciudad: req.query.ciudad,
                pais: req.query.pais,
                lat : req.query.lat,
                long : req.query.long,
                precioMin: parseFloat(req.query.precioMin) || 0,
                precioMax: parseFloat(req.query.precioMax) || 10000000,
                cantHuespedes: parseInt(req.query.cantHuespedes) || 0,
                caracteristicas: req.query.caracteristicas? req.query.caracteristicas.split(',') : [],
            }
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10

            const resultado = await this.alojamientoService.listarAlojamientos(filters, page, limit);
            res.status(200).json({
                page: resultado.page,
                limit: resultado.limit,
                total: resultado.total,
                alojamientos : this.toDtos(resultado.resultAlojamientos)})
        }catch(error) {
            next(error);
        }
    }

    toDto(alojamiento) {
        return {
            _id: alojamiento._id,
            anfitrion: alojamiento.anfitrion,
            caracteristicas: alojamiento.caracteristicas,
            nombre: alojamiento.nombre,
            descripcion: alojamiento.descripcion,
            direccion : alojamiento.direccion,
            precioPorNoche: alojamiento.getPrecioPorNoche()
        };
    }
    toDtos(alojamientos){
        return alojamientos.map(alojamiento => this.toDto(alojamiento));
    }
}