import { Alojamiento } from "../models/domain/alojamiento.js";

export class AlojamientoController {
    constructor(alojamientoService) {
        this.alojamientoService = alojamientoService
    }

    async listarAlojamientos(req, res, next) {
        try{
            const filters = {
                ciudad: req.query.ciudad,
                pais: req.query.pais,
                precioMin: parseFloat(req.query.precioMin),
                precioMax: parseFloat(req.query.precioMax),
                cantHuespedes: parseInt(req.query.cantHuespedes),
                caracteristicas: req.query.caracteristicas?.split(','),
            }
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10

            const alojamientos = await this.alojamientoService.listarAlojamientos(filters, page, limit);
            res.status(200).json(this.toDtos(alojamientos))
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