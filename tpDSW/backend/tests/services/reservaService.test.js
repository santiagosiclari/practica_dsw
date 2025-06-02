// tests/services/reservaService.test.js
import { ReservaService } from '../../airbnb/services/reservaService.js';
import { AlojamientoOcupadoError } from '../../airbnb/models/domain/errors/alojamientoOcupadoError.js';

describe('ReservaService', () => {
  let reservaRepo, alojamientoRepo, userRepo, service;

  beforeEach(() => {
    reservaRepo = { save: jest.fn(), findFechaCoincidente: jest.fn() };
    alojamientoRepo = { findById: jest.fn() };
    userRepo = { findById: jest.fn() };

    service = new ReservaService(reservaRepo, alojamientoRepo, userRepo);
  });

  test('crea una reserva con éxito', async () => {
    const dto = {
      huespedReservador: 'user123',
      alojamiento: 'aloja123',
      cantHuespedes: 2,
      fechaInicio: '2025-06-01',
      fechaFinal: '2025-06-05'
    };

    userRepo.findById.mockResolvedValue({ getId: () => 'user123' });
    alojamientoRepo.findById.mockResolvedValue({ precioPorNoche: 10000 });
    reservaRepo.findFechaCoincidente.mockResolvedValue(null);
    reservaRepo.save.mockResolvedValue({ _id: 'res1' });

    const result = await service.crearReserva(dto);
    expect(result._id).toBe('res1');
  });

  test('lanza error si hay una reserva superpuesta', async () => {
    const dto = {
      huespedReservador: 'user123',
      alojamiento: 'aloja123',
      cantHuespedes: 2,
      fechaInicio: '2025-06-01',
      fechaFinal: '2025-06-05'
    };

    reservaRepo.findFechaCoincidente.mockResolvedValue(true); // Simula que hay conflicto

    await expect(service.crearReserva(dto)).rejects.toThrow(AlojamientoOcupadoError);
  });
});