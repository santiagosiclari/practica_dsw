import { Alojamiento } from "../domain/alojamiento.js";
import { ReservaController } from "../controllers/reservaController.js";
import { ReservaService } from "../services/reservaService.js";
import { ReservaRepository } from "../repositories/reservaRepository.js";
import { UserRepository } from "../repositories/userRepository.js";
import { AlojamientoRepository } from "../repositories/alojamientoRepository.js";

const DB_NAME = "Birbnb"

export const buildAppContext = (DB_CLIENT) => {
    const db = DB_CLIENT.db(DB_NAME)
    const alojamiento = new Alojamiento(db)
    const reservaRepo = new ReservaRepository()
    const userRepo = new UserRepository()
    const alojamientoRepo = new AlojamientoRepository()
    const reservaService = new ReservaService(reservaRepo, alojamientoRepo, userRepo)
    const reservaController = new ReservaController(reservaService)

    return {
        alojamiento,
        reservaRepo,
        userRepo,
        alojamientoRepo,
        reservaService,
        reservaController
    };
};