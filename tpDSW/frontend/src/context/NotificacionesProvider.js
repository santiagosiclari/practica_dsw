import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {getBanner, getAlojamientosFromApi} from "../api/api";

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
            setAlojamientosLoading(false)
        } catch (error) {
            setErrorAlojamientos(error.message)
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