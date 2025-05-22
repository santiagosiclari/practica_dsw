import express from "express"
import { z } from "zod";

import { Usuario } from "./domain/usuario.js";
import { Alojamiento } from "./domain/alojamiento.js";
import { WIFI, ESTACIONAMIENTO, PISCINA, MASCOTAS_PERMITIDAS } from "./domain/caracteristica.js";
import { DOLAR_USA, PESO_ARG, REALES } from "./domain/moneda.js";
import { Foto } from "./domain/foto.js";
import { Reserva , RangoFechas, CambioEstadoReserva } from "./domain/reserva.js";
import { Notificacion, FactoryNotificacion } from "./domain/notificacion.js";

<<<<<<< Updated upstream
import healthRoute from './rutas/healthRoute.js';
import reservaRoute from './rutas/reservaRoute.js';
=======
import healthRoute from './airbnb/rutas/healthRoute.js';

import { ReservaRepository } from "./airbnb/models/repositories/reservaRepository.js";
import { UserRepository } from "./airbnb/models/repositories/userRepository.js";
import { AlojamientoRepository } from "./airbnb/models/repositories/alojamientoRepository.js";
import { NotificacionRepository } from "./airbnb/models/repositories/notificacionRepository.js";

import { ReservaService } from "./airbnb/services/reservaService.js";
import { NotificacionService } from "./airbnb/services/notificacionService.js";
import { AlojamientoService } from "./airbnb/services/alojamientoService.js";

import { ReservaController } from "./airbnb/controllers/reservaController.js";
import { NotificacionController } from "./airbnb/controllers/notificacionController.js";
import { AlojamientoController } from "./airbnb/controllers/alojamientoController.js";
>>>>>>> Stashed changes

const app = express();
const PUERTO = 3000;

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.use("/healthCheck", healthRoute);
app.use("/reserva", reservaRoute);

<<<<<<< Updated upstream
app.listen(PUERTO, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
=======
// Repositories
const reservaRepo = new ReservaRepository();
const userRepo = new UserRepository();
const alojamientoRepo = new AlojamientoRepository();
const notificacionesRepo = new NotificacionRepository();

// Services
const reservaService = new ReservaService(reservaRepo, alojamientoRepo, userRepo);
const notificacionService = new NotificacionService(notificacionesRepo, userRepo);
const alojamientoService = new AlojamientoService(reservaRepo, alojamientoRepo, userRepo);

// Controllers
const reservaController = new ReservaController(reservaService);
const notificacionController = new NotificacionController(notificacionService);
const alojamientoController = new AlojamientoController(alojamientoService);


// Registro de controllers en el server
server.setController(ReservaController, reservaController);
server.setController(NotificacionController, notificacionController);
server.setController(AlojamientoController, alojamientoController);

// Lanzamiento
server.configureRoutes();
server.launch();
>>>>>>> Stashed changes
