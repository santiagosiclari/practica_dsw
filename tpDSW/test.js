import { Reserva } from "./airbnb/models/domain/reserva.js";
import { Alojamiento } from "./airbnb/models/domain/alojamiento.js";
import { RangoFechas } from "./airbnb/models/domain/reserva.js";
import { Usuario, HUESPED, ANFITRION} from "./airbnb/models/domain/usuario.js";
import { Direccion } from "./airbnb/models/domain/direccion.js";

const rango1 = new RangoFechas(new Date('2025-06-01'), new Date('2025-06-10'));
const rango2 = new RangoFechas(new Date('2025-06-08'), new Date('2025-06-15'));
const alojamiento = new Alojamiento(new Usuario("a", "a", ANFITRION, 2), "hotel", new Direccion("a", 1, "a", 10, 20), 4);
const reservaExistente = new Reserva(new Usuario("j", "j", HUESPED, 1), 4, alojamiento, rango1);

alojamiento.reservas.push(reservaExistente);

console.log(alojamiento.estasDisponibleEn(rango2)); // debería dar false
