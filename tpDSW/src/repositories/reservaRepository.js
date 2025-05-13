import { Reserva } from "../domain/reserva.js";

export class ReservaRepository {
    reservas = [];

    agregarReserva(reserva) {
        reserva.id = this.obtenerSiguienteId()
        this.reservas.push(reserva)
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

    guardarReserva(id, reservaActualidada) {
        remove(this.reservas, r => r.id === id)
        this.reservas.push(reservaActualidada)
        return reservaActualidada
    }

    removerReserva(reserva) {
        remove(this.reservas, r => r.id === reserva.id)
    }

    obtenerSiguienteId() {
        if (this.reservas.length() > 0)
            return this.reservas.length() + 1
        return 0
        //return (this.reservas[this.platos.length - 1]?.id || 0) + 1;
    }
}