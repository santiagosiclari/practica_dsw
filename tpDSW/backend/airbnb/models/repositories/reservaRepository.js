import {
  ReservaModel,
  reservaToDocument,
  docToReserva,
} from "../schemas/reservaSchema.js";

export class ReservaRepository {
  constructor() {
    this.model = ReservaModel;
  }

  async save(reserva) {
    const query = reserva._id
        ? { _id: reserva._id }
        : { _id: new this.model()._id };
    const reservaMongo = await this.model.findOneAndUpdate(
        query,
        reservaToDocument(reserva),
        {
          new: true,
          runValidators: true,
          upsert: true,
        }
    ).populate({
      path: 'alojamiento',
      populate: {
        path: 'reservas',
        populate: [
          { path: 'alojamiento', select: 'direccion nombre' },
          { path: 'huespedReservador' }
        ]
      }
    }).populate('huespedReservador');
    return docToReserva(reservaMongo);
  }

  async findFechaCoincidente(fechaInicial, fechaFin, alojamientoId) {
    const coincidencia = await this.model.findOne({
      alojamiento: alojamientoId,
      $and: [
        { fechaInicio: { $lte: fechaFin } }, // Overlap condition
        { fechaFinal: { $gte: fechaInicial } }, // Overlap condition
      ],
    });
    return coincidencia;
  }
  async findReservasProximas(fechaReferencia, dias = 1) {
    const fechaLimite = new Date(fechaReferencia);
    fechaLimite.setDate(fechaLimite.getDate() + dias);

    const docs = await this.model.find({
      estado: "CONFIRMADA",
      fechaInicio: {
        $gte: fechaReferencia,
        $lte: fechaLimite,
      },
    });

    return docs.map(docToReserva);
  }
  async findReservasPorFinalizar(fechaReferencia, dias = 1) {
    const fechaLimite = new Date(fechaReferencia);
    fechaLimite.setDate(fechaLimite.getDate() + dias);

    const docs = await this.model.find({
      estado: "CONFIRMADA",
      fechaFinal: {
        $gte: fechaReferencia,
        $lte: fechaLimite,
      },
    });

    return docs.map(docToReserva);
  }
  async findAll() {
    const reservas = await this.model.find()
        .populate({
          path: 'alojamiento',
          // populate solo si necesitás campos referenciados como 'anfitrión', pero no 'reservas'
          select: 'nombre direccion precioPorNoche cantHuespedesMax caracteristicas'
        })
        .populate('huespedReservador'); // Cargamos también el huésped

    // Filtramos reservas inválidas y las convertimos
    return reservas
        .map(docToReserva)
        .filter(r => r !== undefined);
  }


  async findById(id) {
    const reserva = await this.model.findById(id)
        .populate({
          path: 'alojamiento',
          populate: {
            path: 'reservas',
            populate: [
              { path: 'alojamiento', select: 'direccion nombre' },
              { path: 'huespedReservador' }
            ]
          },
        })
        .populate('huespedReservador');

    return docToReserva(reserva);
  }

  async obtenerReservas(idUsuario) {
    const reservas = await this.model.find({ huespedReservador: idUsuario })
        .populate({
          path: 'alojamiento',
          select: 'nombre direccion precioPorNoche cantHuespedesMax caracteristicas'
        })
        .populate('huespedReservador');

    if (reservas.length === 0) {
      throw new Error("No existen reservas para este usuario");
    }

    return reservas
        .map(docToReserva)
        .filter(r => r !== undefined);
  }
}

