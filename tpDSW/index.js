import express from "express"
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

const app = express();
const PUERTO = 3000;

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.use("/healthCheck", healthRoute);
app.use("/reserva", reservaRoute);

app.listen(PUERTO, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});