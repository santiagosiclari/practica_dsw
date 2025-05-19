import { Reserva } from "../domain/reserva.js";
import remove from "lodash-es/remove.js"

export class ReservaRepository {
    reservas = [];

    agregarReserva(reserva) {
        reserva.id = this.obtenerSiguienteId()
        this.reservas.push(reserva)
        return reserva
    }

    findAll() {
        return this.reservas
    }

    findById(id) {
        const reserva = this.reservas.find(reserva => reserva.id === id)
        if(!reserva) {
            throw new Error("No existe la reserva")
        }
        return reserva
    }

    obtenerReservas(idUsuario) {
        const reservas = this.reservas.filter(reserva => reserva.getHuespedId() === idUsuario) // Get huesped Id devuelve string
        if(reservas.length === 0) {
            throw new Error("No existen reservas para este usuario")
        }
        return reservas
    }

    guardarReserva(id, reservaActualidada) {
        remove(this.reservas, r => r.id === id)
        this.reservas.push(reservaActualidada)
        return reservaActualidada
    }

    removerReserva(reserva) {
        remove(this.reservas, r => r.id === reserva.id)
    }

    obtenerSiguienteId() {
        return this.reservas.length + 1
    }
}