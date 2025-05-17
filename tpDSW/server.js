import express from "express";
import { registerReservaRoutes } from "./airbnb/rutas/reservaRoute.js";

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

  getController(controllerClass) {
    const controller = this.#controllers[controllerClass.name];
    if (!controller) {
      throw new Error("Falta el controller de esa ruta.");
    }
    return controller;
  }

  configureRoutes() {
    registerReservaRoutes(this.app, this.getController.bind(this));
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log('Servidor escuchando en http://localhost:' + this.port);
    });
  }
}