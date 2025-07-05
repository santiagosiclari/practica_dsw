import axios from "axios";

const alojamientosApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
});

export const getAlojamientos = async (pageNumber = 1) => {
    const { data } = await alojamientosApi.get(`/alojamientos?page=${pageNumber}`);
    return data.alojamientos;
};

export const getAlojamientoById = async (id) => {
    const { data } = await alojamientosApi.get(`/alojamientos/${id}`);
    return data;
};

export const getBanner = async () => {
    const { data } = await alojamientosApi.get("/banner");
    return data.message;
};
