import "./reserva.css"
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {ReservasContext} from "../../context/ReservasProvider";
import {AlojamientosContext} from "../../context/AlojamientosProvider";



export const ReservaDetailPage = () => {
    const navigate = useNavigate();
    const {reservas, setReservas} = useContext(ReservasContext);
    const {alojamientos, setAlojamientos} = useContext(AlojamientosContext);
    const [reserva, setReserva] = useState({});


}
