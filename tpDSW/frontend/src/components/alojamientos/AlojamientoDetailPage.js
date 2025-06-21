import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAlojamientoById } from "../../api/alojamientos";
import "./AlojamientoDetailPage.css";

const AlojamientoDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [alojamiento, setAlojamiento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAlojamientoById(id);
                setAlojamiento(data);
            } catch (err) {
                setError("Error al cargar el alojamiento");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const irAReserva = () => {
        navigate(`/checkout/${alojamiento._id || alojamiento.id}`);
    };

    if (loading) return <div className="detail-loading">Cargando alojamiento...</div>;
    if (error) return <div className="detail-error">{error}</div>;
    if (!alojamiento) return null;

    return (
        <div className="alojamiento-detail-container">
            <h1 className="alojamiento-detail-title">{alojamiento.nombre}</h1>

            <div className="alojamiento-detail-gallery">
                {alojamiento.fotos && alojamiento.fotos.length > 0 ? (
                    alojamiento.fotos.map((foto, index) => (
                        <img
                            key={index}
                            src={typeof foto === "string" ? foto : foto.path}
                            alt={foto.descripcion || `Imagen ${index + 1} de ${alojamiento.nombre}`}
                            className="alojamiento-detail-img"
                        />
                    ))
                ) : (
                    <img
                        src={alojamiento.image || alojamiento.imagen}
                        alt={`Imagen de ${alojamiento.nombre}`}
                        className="alojamiento-detail-img"
                    />
                )}
            </div>

            <div className="alojamiento-detail-info">
                <p><strong>Precio por noche:</strong> ${alojamiento.precioPorNoche || alojamiento.precio}</p>
                <p><strong>Ubicación:</strong> {alojamiento.direccion?.ciudad?.nombre || alojamiento.ciudad}, {alojamiento.direccion?.ciudad?.pais?.nombre || alojamiento.pais}</p>
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
