import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AlojamientoDetailPage.css";
import axios from "axios";

const API_BASE_URL = "https://684e02cf65ed08713917a135.mockapi.io/api";

const AlojamientoDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [alojamiento, setAlojamiento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlojamiento = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/alojamientos/${id}`);
                setAlojamiento(response.data);
            } catch (err) {
                setError("No se pudo cargar el alojamiento.");
            } finally {
                setLoading(false);
            }
        };

        fetchAlojamiento();
    }, [id]);

    const irAReserva = () => {
        navigate(`/checkout/${alojamiento.id}`);
    };

    if (loading) return <div className="detail-loading">Cargando alojamiento...</div>;
    if (error) return <div className="detail-error">{error}</div>;
    if (!alojamiento) return null;

    return (
        <div className="alojamiento-detail-container">
            <h1 className="alojamiento-detail-title">{alojamiento.nombre}</h1>

            <img
                src={alojamiento.image || alojamiento.imagen}
                alt={`Imagen de ${alojamiento.nombre}`}
                className="alojamiento-detail-img"
            />

            <div className="alojamiento-detail-info">
                <p><strong>Precio por noche:</strong> ${alojamiento.precioPorNoche || alojamiento.precio}</p>
                <p><strong>Ubicación:</strong> {alojamiento.ciudad}, {alojamiento.pais}</p>
                <p><strong>Capacidad máxima:</strong> {alojamiento.cantHuespedesMax || "No especificado"} huespedes</p>
                <p><strong>Descripción:</strong> {alojamiento.descripcion || "Este alojamiento es ideal para tu estadía."}</p>
            </div>

            <button className="alojamiento-detail-btn" onClick={irAReserva}>
                Reservar ahora
            </button>
        </div>
    );
};

export default AlojamientoDetailPage;
