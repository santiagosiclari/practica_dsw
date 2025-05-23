import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Server } from "./server.js";
import { MongoDBClient } from "./airbnb/config/database.js";

import healthRoute from './airbnb/rutas/healthRoute.js';

import { ReservaRepository } from "./airbnb/models/repositories/reservaRepository.js";
import { UserRepository } from "./airbnb/models/repositories/userRepository.js";
import { AlojamientoRepository } from "./airbnb/models/repositories/alojamientoRepository.js";

import { ReservaService } from "./airbnb/services/reservaService.js";
import { AlojamientoService } from "./airbnb/services/alojamientoService.js";

import { ReservaController } from "./airbnb/controllers/reservaController.js";
import { AlojamientoController } from "./airbnb/controllers/alojamientoController.js";

const app = express();
const port = process.env.port;
const server = new Server(app, port);

MongoDBClient.connect();

app.use("/healthCheck", healthRoute);

// Repositories
const reservaRepo = new ReservaRepository();
const userRepo = new UserRepository();
const alojamientoRepo = new AlojamientoRepository();

// Services
const reservaService = new ReservaService(reservaRepo, alojamientoRepo, userRepo);
const alojamientoService = new AlojamientoService(reservaRepo, alojamientoRepo, userRepo);

// Controllers
const reservaController = new ReservaController(reservaService);
const alojamientoController = new AlojamientoController(alojamientoService);


// Registro de controllers en el server
server.setController(ReservaController, reservaController);
server.setController(AlojamientoController, alojamientoController);

// Lanzamiento
server.configureRoutes();
server.launch();