export const construirQueryParams = ({
                                         ciudad,
                                         fechaInicio,
                                         fechaFinal,
                                         cantHuespedes,
                                         caracteristicas,
                                         precioMin,
                                         precioMax,
                                         lat,
                                         long,
                                         page,
                                        limit
                                     }) => {
    const params = new URLSearchParams();

    if (ciudad) params.set("ciudad", ciudad);
    //if (pais) params.set("pais", pais);
    if (fechaInicio) params.set("fechaInicio", fechaInicio);
    if (fechaFinal) params.set("fechaFinal", fechaFinal);
    if (cantHuespedes) params.set("cantHuespedes", cantHuespedes);
    if (caracteristicas?.length) params.set("caracteristicas", caracteristicas.join(","));
    if (precioMin) params.set("precioMin", precioMin);
    if (precioMax) params.set("precioMax", precioMax);
    if (lat) params.set("lat", lat);
    if (long) params.set("long", long);
    if (page) params.set("page", page);
    if (limit) params.set("limit", limit);


    return params;
};