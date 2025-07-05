import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Texto } from "../ModalReservaConfirmada/ModalReservaConfirmada";
import dayjs from "dayjs";
import "./ReservaDetailPage.css";

const ReservaDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reserva, setReserva] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/reservas/${id}`);
                setReserva(response.data);
            } catch (err) {
                setError("No se pudo cargar la reserva.");
            } finally {
                setLoading(false);
            }
        };

        fetchReserva();
    }, [id]);

    if (loading) return <div className="detail-loading">Cargando reserva...</div>;
    if (error) return <div className="detail-error">{error}</div>;
    if (!reserva) return null;

    const noches = dayjs(reserva.fechaFinal).diff(dayjs(reserva.fechaInicio), 'day');
    const total = reserva.precioPorNoche * noches;

    return (
        <div className="reserva-detail-container">
            <h1 className="reserva-detail-title">Reserva Confirmada</h1>

            <div className="reserva-detail-info">
                <Texto etiqueta={"ID de Reserva"} texto={reserva._id} />
                <Texto etiqueta={"Precio por Noche"} texto={`$${reserva.precioPorNoche}`} />
                <Texto etiqueta={"Cantidad de Huéspedes"} texto={reserva.cantHuespedes} />
                <Texto etiqueta={"Estado"} texto={reserva.estado} />
                <Texto etiqueta={"Fecha de Alta"} texto={dayjs(reserva.fechaAlta).format("YYYY-MM-DD")} />
                <Texto etiqueta={"Check-in"} texto={dayjs(reserva.fechaInicio).format("YYYY-MM-DD")} />
                <Texto etiqueta={"Check-out"} texto={dayjs(reserva.fechaFinal).format("YYYY-MM-DD")} />
                <Texto etiqueta={"Total"} texto={`$${total}`} />
            </div>

            <div className="volver-home-container">
                <button className="volver-home-btn" onClick={() => navigate("/")}>
                    Volver a la página principal
                </button>
            </div>
        </div>
    );
};

export default ReservaDetailPage;
