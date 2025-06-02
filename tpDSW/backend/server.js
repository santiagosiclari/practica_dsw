import express from "express";
import { registerReservaRoutes } from "./airbnb/rutas/reservaRoute.js";
import { registerAlojamientoRoutes } from "./airbnb/rutas/alojamientoRoute.js";
import { errorHandler } from "./airbnb/middlewares/errorHandler.js";
import { registerNotificacionRoutes } from "./airbnb/rutas/notificacionRoute.js";

export class Server {
  #controllers = {};
  #app;

  constructor(app, port = 3000) {
    this.#app = app;
    this.port = port;
    this.#app.use(express.json());
  }

  get app() {
    return this.#app;
  }

  setController(controllerClass, controller) {
    this.#controllers[controllerClass.name] = controller;
  }

  configureRoutes(reservaController, notificacionController, alojamientoController) {
    registerReservaRoutes(this.app, reservaController);
    registerNotificacionRoutes(this.app, notificacionController);
    registerAlojamientoRoutes(this.app, alojamientoController);

     // Middleware para manejar rutas no encontradas
    this.#app.use((req, res, next) => {
      res.status(404).json({
        status: 'fail',
        message: "La ruta solicitada no existe"
      });
    });

    // Middleware global de manejo de errores
    this.#app.use(errorHandler);
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log('Servidor escuchando en http://localhost:' + this.port);
    });
  }
}