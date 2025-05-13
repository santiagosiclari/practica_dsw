import express from "express"
import bodyParser from "body-parser"
import { z } from "zod";

import { Usuario } from "./domain/usuario.js";
import { Alojamiento } from "./domain/alojamiento.js";
import { WIFI, ESTACIONAMIENTO, PISCINA, MASCOTAS_PERMITIDAS } from "./domain/caracteristica.js";
import { DOLAR_USA, PESO_ARG, REALES } from "./domain/moneda.js";
import { Foto } from "./domain/foto.js";
import { Reserva , RangoFechas, CambioEstadoReserva } from "./domain/reserva.js";
import { Notificacion, FactoryNotificacion } from "./domain/notificacion.js";

import healthRoute from './rutas/healthRoute.js';
import reservaRoute from './rutas/reservaRoute.js';
import { ReservaController } from "./controllers/reservaController.js";
import { ReservaService } from "./services/reservaService.js";
import { ReservaRepository } from "./models/repositories/reservaRepository.js";
import { UserRepository } from "./models/repositories/userRepository.js";
import { AlojamientoRepository } from "./models/repositories/alojamientoRepository.js";

const app = express();
app.use(bodyParser.json())
const PUERTO = 3000;

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.use("/healthCheck", healthRoute);
// app.use("/reserva", reservaRoute);

const reservaRepo = new ReservaRepository()
const userRepo = new UserRepository()
const alojamientoRepo = new AlojamientoRepository()
const reservaService = new ReservaService(reservaRepo, alojamientoRepo, userRepo)
const reservaController = new ReservaController(reservaService)

app.post("/reservas", (req, res) => reservaController.crearReserva(req, res));

app.listen(PUERTO, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});