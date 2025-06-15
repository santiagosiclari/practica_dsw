import {createContext, useEffect, useState} from "react";
import {getBanner, getAlojamientosFromApi} from "../api/alojamientos";

export const AlojamientosContext = createContext();

export const AlojamientosProvider = ({children}) => {
    const [alojamientos, setAlojamientos] = useState([]);
    const [errorAlojamientos, setErrorAlojamientos] = useState();
    const [banner, setBanner] = useState('');
    const [alojamientosLoading, setAlojamientosLoading] = useState(false);

    const cargarAlojamientos = async () => {
        setAlojamientos(await getAlojamientosFromApi());
    }
    const cargarBanner = async () => {
        setBanner(await getBanner())
    }

    const cargarTodo = async () => {
        try{
            setAlojamientosLoading(true)
            await cargarAlojamientos();
            await cargarBanner();
        } catch (error) {
            setErrorAlojamientos(error.message)
        } finally {
            setAlojamientosLoading(false)
        }
    }

    useEffect(() => {
        cargarTodo()
    }, [])

    const contextValue = {
        alojamientos,
        errorAlojamientos,
        banner,
        alojamientosLoading,
    }

    return <AlojamientosContext value={contextValue}>
        {children}
    </AlojamientosContext>


}