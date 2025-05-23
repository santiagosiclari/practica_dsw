export class AlojamientoController {
  constructor(alojameintoService) {
    this.alojameintoService = alojameintoService;
  }

  async getAlojamientos(req, res) {
    const {
      pais,
      ciudad,
      precioMin,
      precioMax,
      huespMax,
      wifi,
      pileta,
      estacionamiento,
      mascotasPermitidas,
      aireAcondicionado,
      calefaccion,
      cocinaCompleta,
      lavarropas,
      parrilla,
      servicioLimpieza,
      alarma,
      cajaFuerte,
      pagina = 1,
      limite = 10,
    } = req.query;

    const filtros = {
      pais,
      ciudad,
      precioMin: precioMin ? parseFloat(precioMin) : undefined,
      precioMax: precioMax ? parseFloat(precioMax) : undefined,
      huespMax: huespMax ? parseInt(huespMax) : undefined,
      wifi: wifi === true,
      pileta: pileta === true,
      estacionamiento: estacionamiento === true,
      mascotasPermitidas: mascotasPermitidas === true,
      aireAcondicionado: aireAcondicionado === true,
      calefaccion: calefaccion === true,
      cocinaCompleta: cocinaCompleta === true,
      lavarropas: lavarropas === true,
      parrilla: parrilla === true,
      servicioLimpieza: servicioLimpieza === true,
      alarma: alarma === true,
      cajaFuerte: cajaFuerte === true,
    };
    try {
        const resultados = await this.alojameintoService.getAlojamientoFlitro(filtros, {pagina, limite});
        res.json(resultados);
    } catch (error) {
      console.error(error);
      res.status(400).json({mensaje: 'Error al obetener alojamiento'});
    }
  }
}