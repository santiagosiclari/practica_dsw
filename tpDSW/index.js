import express from "express"
import { z } from "zod";

import { Usuario } from "./domain/usuario.js";
import { Direccion, Ciudad, Alojamiento, Pais } from "./domain/alojamiento.js";
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

app.use("/healthcheck", healthRoute);
app.use("/reserva", reservaRoute);

app.listen(PUERTO, () => {
    console.log('Servidor Activo');
});


const usuario1 = new Usuario("Juan", "Cospito", 'HUESPED');
console.log(usuario1);
const anfitrion1 = new Usuario("Santiago", "santisic", 'ANFITRION');
console.log(anfitrion1);

const pais1 = new Pais("argentina");
console.log(pais1);
const dir1 = new Direccion("BsAs", pais1);
console.log(dir1);
const foto1 = new Foto("bUENA", "ARG");
const alojamiento1 = new Alojamiento(anfitrion1, "Riu", "Hermoso", 100, 'DOLAR_USA', '10:00', '11:00', dir1, 5, ['WIFI'], null, [foto1]);
console.log(alojamiento1);

const reserva = new Reserva(usuario1, 3, alojamiento1, )