import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Server } from "./server.js";
import { MongoDBClient } from "./airbnb/config/database.js";

import healthRoute from './airbnb/rutas/healthRoute.js';

import { ReservaRepository } from "./airbnb/models/repositories/reservaRepository.js";
import { UserRepository } from "./airbnb/models/repositories/userRepository.js";
import { AlojamientoRepository } from "./airbnb/models/repositories/alojamientoRepository.js";
import { NotificacionRepository } from "./airbnb/models/repositories/notificacionRepository.js";

import { ReservaService } from "./airbnb/services/reservaService.js";
import { NotificacionService } from "./airbnb/services/notificacionService.js";

import { ReservaController } from "./airbnb/controllers/reservaController.js";
import { NotificacionController } from "./airbnb/controllers/notificacionController.js";

const app = express();
const port = process.env.port;
const server = new Server(app, port);

MongoDBClient.connect();

app.use("/healthCheck", healthRoute);

// Repositories
const reservaRepo = new ReservaRepository();
const userRepo = new UserRepository();
const alojamientoRepo = new AlojamientoRepository();
const notificacionesRepo = new NotificacionRepository();

// Services
const reservaService = new ReservaService(reservaRepo, alojamientoRepo, userRepo);
const notificacionService = new NotificacionService(notificacionesRepo, userRepo);

// Cron-Jobs
iniciarTareaChecks(notificacionService);

// Controllers
const reservaController = new ReservaController(reservaService);
const notificacionController = new NotificacionController(notificacionService);


// Registro de controllers en el server
server.setController(ReservaController, reservaController);
server.setController(NotificacionController, notificacionController);

// Lanzamiento
server.configureRoutes();
server.launch();