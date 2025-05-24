import express from "express"
import { z } from "zod";

<<<<<<< Updated upstream
import { Usuario } from "./domain/usuario.js";
import { Alojamiento } from "./domain/alojamiento.js";
import { WIFI, ESTACIONAMIENTO, PISCINA, MASCOTAS_PERMITIDAS } from "./domain/caracteristica.js";
import { DOLAR_USA, PESO_ARG, REALES } from "./domain/moneda.js";
import { Foto } from "./domain/foto.js";
import { Reserva , RangoFechas, CambioEstadoReserva } from "./domain/reserva.js";
import { Notificacion, FactoryNotificacion } from "./domain/notificacion.js";
=======
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import express from "express";
import { Server } from "./server.js";
import { MongoDBClient } from "./airbnb/config/database.js";
>>>>>>> Stashed changes

import healthRoute from './rutas/healthRoute.js';
import reservaRoute from './rutas/reservaRoute.js';

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

// Cron-Jobs
iniciarTareaChecks(notificacionService);

// Controllers
const reservaController = new ReservaController(reservaService);
const notificacionController = new NotificacionController(notificacionService);


// Registro de controllers en el server
server.setController(ReservaController, reservaController);
server.setController(NotificacionController, notificacionController);

// Lanzamiento
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.configureRoutes();
server.launch();
>>>>>>> Stashed changes
