import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModalReservaConfirmada from "../ModalReservaConfirmada/ModalReservaConfirmada";
import { Texto } from "../ModalReservaConfirmada/ModalReservaConfirmada";
import "./ReservaDetailPage.css";

const API_BASE_URL = "https://684e02cf65ed08713917a135.mockapi.io/api";

const ReservaDetailPage = () => {
    const { id } = useParams();
    const [alojamiento, setAlojamiento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

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

    const confirmarReserva = () => {
        setMostrarModal(true);
    };

    if (loading) return <div className="detail-loading">Cargando reserva...</div>;
    if (error) return <div className="detail-error">{error}</div>;
    if (!alojamiento) return null;

    return (
        <div className="alojamiento-detail-container">
            <h1 className="alojamiento-detail-title">Check Out - {alojamiento.nombre}</h1>

            <div className="alojamiento-detail-info">
                <Texto etiqueta={"Precio Total"} texto={alojamiento.precioPorNoche || alojamiento.precio}/>
                <Texto etiqueta={"Ubicación"} texto={alojamiento.ciudad + ", " + alojamiento.pais}/>
                <Texto etiqueta={"Huéspedes"} texto={alojamiento.cantHuespedesMax || "No especificado"}/>
                <Texto etiqueta={"Descripción"} texto={alojamiento.descripcion || "Este alojamiento es ideal para tu estadía."}/>
                <Texto etiqueta={"Fecha Alta"} texto={alojamiento.fechaAlta || "2024-06-01"}/>
                <Texto etiqueta={"Fecha Inicio:"} texto={alojamiento.fechaInicio || "2024-06-15"}/>
                <Texto etiqueta={"Fecha Final:"} texto={alojamiento.fechaFinal || "2024-06-18"}/>
            </div>

            <button className="alojamiento-detail-btn" onClick={confirmarReserva}>
                Confirmar Reserva
            </button>

            {mostrarModal && (
                <ModalReservaConfirmada
                    datosReserva={{
                        _id: alojamiento.id || "123ABC",
                        alojamiento: alojamiento,
                        precioPorNoche: alojamiento.precioPorNoche || alojamiento.precio,
                        cantHuespedes: alojamiento.cantHuespedesMax,
                        fechaAlta: alojamiento.fechaAlta || "2024-06-01",
                        fechaInicio: alojamiento.fechaInicio || "2024-06-15",
                        fechaFinal: alojamiento.fechaFinal || "2024-06-18"
                    }}
                    onClose={() => setMostrarModal(false)}
                />
            )}

        </div>
    );
};

export default ReservaDetailPage;
