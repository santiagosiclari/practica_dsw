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
import { AlojamientoService } from "./airbnb/services/alojamientoService.js";
import { NotificacionService } from "./airbnb/services/notificacionService.js";

import { ReservaController } from "./airbnb/controllers/reservaController.js";
import { NotificacionController } from "./airbnb/controllers/notificacionController.js";
import { AlojamientoController } from "./airbnb/controllers/alojamientoController.js";

import { iniciarTareaChecks } from "./airbnb/tasks/notificacionTasks.js";

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import {FactoryNotificacion} from "./airbnb/models/domain/notificacion.js";

import cors from "cors";

const app = express();
app.use(cors());
const port = process.env.PORT;
const server = new Server(app, port);

MongoDBClient.connect();

app.use("/healthCheck", healthRoute);

// Repositories
const reservaRepo = new ReservaRepository();
const userRepo = new UserRepository();
const alojamientoRepo = new AlojamientoRepository();
const notificacionesRepo = new NotificacionRepository();

const factoryNotificacion = new FactoryNotificacion();

// Services
const notificacionService = new NotificacionService(notificacionesRepo, userRepo);
const reservaService = new ReservaService(reservaRepo, alojamientoRepo, userRepo, notificacionService, notificacionesRepo, factoryNotificacion);
const alojamientoService = new AlojamientoService(alojamientoRepo);

// Cron-Jobs
iniciarTareaChecks(notificacionService);

// Controllers
const reservaController = new ReservaController(reservaService);
const notificacionController = new NotificacionController(notificacionService);
const alojamientoController = new AlojamientoController(alojamientoService);

// Registro de controllers en el server
server.setController(ReservaController, reservaController);
server.setController(NotificacionController, notificacionController);
server.setController(AlojamientoController, alojamientoController);

//Swagger
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Lanzamiento
server.configureRoutes(reservaController, notificacionController, alojamientoController);
server.launch();