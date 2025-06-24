import axios from "axios";

const alojamientosApi = axios.create({
    baseURL: 'http://localhost:3000'
});

export const getAlojamientos = async (pageNumber) => {
    const { data } = await alojamientosApi.get("/alojamientos");
    return data.alojamientos; // ✅ extrae directamente el array
};

export const getAlojamientoById = async (id) => {
    const { data } = await alojamientosApi.get(`/alojamientos/${id}`);
    return data;
};

export const getBanner = () => alojamientosApi.get('banner').then(r => r.data.message)