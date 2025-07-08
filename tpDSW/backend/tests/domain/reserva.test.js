import {
    Reserva,
    RangoFechas
} from "../../airbnb/models/domain/reserva.js";
import { Alojamiento } from "../../airbnb/models/domain/alojamiento.js";
import { Usuario, HUESPED, ANFITRION } from "../../airbnb/models/domain/usuario.js";
import { Direccion } from "../../airbnb/models/domain/direccion.js";
import { Ciudad } from "../../airbnb/models/domain/ciudad.js";
import { Pais } from "../../airbnb/models/domain/pais.js";
import { AlojamientoSobrepasadoError } from "../../airbnb/models/domain/errors/alojamientoSobrepasado.js";

describe("Reserva", () => {
    const roli = new Usuario("Roli", "roli@gmail.com", ANFITRION);
    const direccion = new Direccion("Medrano", 123, new Ciudad("Buenos Aires", new Pais("Argentina")), "-34.6", "-58.4");
    const alojamiento = new Alojamiento(roli, "Casa Roli", direccion);
    alojamiento.precioPorNoche = 100;
    const huesped = new Usuario("Huésped", "huesped@gmail.com", HUESPED);

    test("Detecta superposición entre reservas", () => {
        const rango1 = new RangoFechas("2025-07-10", "2025-07-15");
        const reserva1 = new Reserva(huesped, 2, alojamiento, rango1);

        const rango2 = new RangoFechas("2025-07-13", "2025-07-17");
        expect(reserva1.seSuperponeCon(rango2)).toBe(true);
    });

    test("Calcula cantidad de días correctamente", () => {
        const rango = new RangoFechas("2025-07-10", "2025-07-15");
        const reserva = new Reserva(huesped, 2, alojamiento, rango);
        expect(reserva.calcularDias()).toBe(5);
    });

    test("Lanza error si se supera la capacidad máxima", () => {
        const rango = new RangoFechas("2025-07-10", "2025-07-15");
        const reserva = new Reserva(huesped, 6, alojamiento, rango); // 6 es más que el max 5
        expect(() => reserva.setCantHuespedes(10)).toThrow(AlojamientoSobrepasadoError);
    });
});
