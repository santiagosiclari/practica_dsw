import { Alojamiento } from "../../airbnb/models/domain/alojamiento.js";
import {ANFITRION, HUESPED, Usuario} from "../../airbnb/models/domain/usuario.js";
import {Direccion} from "../../airbnb/models/domain/direccion.js";
import {Ciudad} from "../../airbnb/models/domain/ciudad.js";
import {Pais} from "../../airbnb/models/domain/pais.js";
import {RangoFechas, Reserva} from "../../airbnb/models/domain/reserva.js";

describe("Testea si está disponible en una fecha", () => {
    test("Alojamiento disponible", () => {
        const roli = new Usuario("roli", "roli@gmail.com", ANFITRION)
        const alberto = new Usuario("Alberto", "Albertura@yahoo.com", HUESPED)
        const direccionCasaRoli = new Direccion("Medrano", 123, new Ciudad("Buenos Aires", new Pais("Argentina")), "10.2321", "-60.312312")
        const casaRoli = new Alojamiento(roli, "casa Roli", direccionCasaRoli);

        const reservaVieja = new Reserva(alberto, 2, casaRoli, new RangoFechas("2025-07-20", "2025-07-25"), Date.now())

        casaRoli.reservas.push(reservaVieja)

        expect(casaRoli.estasDisponibleEn(new RangoFechas("2025-07-21", "2025-07-24"))).toBe(false)
    })

    test("Alojamiento no disponible", () => {
        const roli = new Usuario("roli", "roli@gmail.com", ANFITRION)
        const alberto = new Usuario("Alberto", "Albertura@yahoo.com", HUESPED)
        const direccionCasaRoli = new Direccion("Medrano", 123, new Ciudad("Buenos Aires", new Pais("Argentina")), "10.2321", "-60.312312")
        const casaRoli = new Alojamiento(roli, "casa Roli", direccionCasaRoli);

        const reservaVieja = new Reserva(alberto, 2, casaRoli, new RangoFechas("2026-07-20", "2026-07-25"), Date.now())
        casaRoli.reservas.push(reservaVieja)

        expect(casaRoli.estasDisponibleEn(new RangoFechas("2025-07-21", "2025-07-24"))).toBe(true)
    })
})

describe("Test si entran en la casa de roli", () => {
    test("Superan los huespedes maximos", () => {
        const roli = new Usuario("roli", "roli@gmail.com", ANFITRION)
        const direccionCasaRoli = new Direccion("Medrano", 123, new Ciudad("Buenos Aires", new Pais("Argentina")), "10.2321", "-60.312312")
        const casaRoli = new Alojamiento(roli, "casa Roli", direccionCasaRoli);
        casaRoli.cantHuespedesMax = 4

        expect(casaRoli.puedenAlojarse(8)).toBe(false)
    })

    test("No superan los huespedes maximos", () => {
        const roli = new Usuario("roli", "roli@gmail.com", ANFITRION)
        const direccionCasaRoli = new Direccion("Medrano", 123, new Ciudad("Buenos Aires", new Pais("Argentina")), "10.2321", "-60.312312")
        const casaRoli = new Alojamiento(roli, "casa Roli", direccionCasaRoli);
        casaRoli.cantHuespedesMax = 4

        expect(casaRoli.puedenAlojarse(2)).toBe(true)
    })
})