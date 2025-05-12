import { Alojamiento } from "../../domain/alojamiento.js";
import { Direccion } from "../../domain/direccion.js";
import { TipoUsuario, Usuario } from "../../domain/usuario.js";

export class AlojamientoRepository {
    anfitrion = new Usuario("Juan", "aa", TipoUsuario.ANFITIRON, "1")
    direccion = new Direccion("Calle falsa", "123", "BsAs", "10", "9")
    alojamiento = new Alojamiento(this.anfitrion, "Casa grande", this.direccion, 1)
    alojamientos = [this.alojamiento];

    agregarAlojamiento(alojamiento) {
        alojamiento.id = this.obtenerSiguienteId()
        this.alojamientos.push(alojamiento)
    }

    findAll() {
        return this.alojamientos
    }

    findById(id) {
        const alojamiento = this.alojamientos.find(alojamiento => alojamiento.id === id)
        if(!alojamiento) {
            throw new Error("No existe el alojamiento")
        }
        return alojamiento
    }
    obtenerSiguienteId() {
        return this.alojamientos.length() + 1
        //return (this.reservas[this.platos.length - 1]?.id || 0) + 1;
    }
}