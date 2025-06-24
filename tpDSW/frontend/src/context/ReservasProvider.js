import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const ReservasContext = createContext();

export const ReservasProvider = ({children}) => {
    const [reserva, setReserva] = useState([]);

    const agregarAlojamientoAReserva = async (alojamientoSeleccionado) => {
        console.log("Agregando reserva...", alojamientoSeleccionado.getNombre());
        setReserva({...reserva, alojamiento: alojamientoSeleccionado})
    }

    const contextValue = {
        reserva,
        agregarAlojamientoAReserva
    }

    return <ReservasContext value={contextValue}>
        {children}
    </ReservasContext>
}