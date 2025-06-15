import axios from "axios";

const alojamientosApi = axios.create({
    baseURL: 'https://684e02cf65ed08713917a135.mockapi.io/api'
})

export const getAlojamientosFromApi = async () => {
    try{
        const alojamientos = await alojamientosApi.get('/alojamientos')
            .then(r => r.data);
        const imagenes = await alojamientosApi.get('/images')
            .then(r => r.data);
        return alojamientos.map(p => ({
            ...p,
            imagen: p.image,
            precio: p.precioPorNoche,
        }));
    }catch (error) {
        throw error;
    }
}

export const getBanner = () => alojamientosApi.get('banner').then(r => r.data.message)
