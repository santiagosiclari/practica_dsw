import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlojamientoById } from "../../api/alojamientos";
import ItemBox from "../Item-box/ItemBox"; // Asegurate de que la ruta sea correcta
import "./AlojamientoDetailPage.css";
import {TituloH3} from "../Titulos/Titulos";

const AlojamientoDetailPage = () => {
    const { id } = useParams();
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

    if (loading) return <div className="detail-loading">Cargando alojamiento...</div>;
    if (error) return <div className="detail-error">{error}</div>;
    if (!alojamiento) return null;

    return (
        <div className="alojamiento-detail-container">
            <h1 className="alojamiento-detail-title">{alojamiento.nombre}</h1>
            <p className="alojamiento-host">
                Entire place hosted by {alojamiento.anfitrion?.nombre || "Anfitrión"} – {alojamiento.cantHuespedesMax || "X"} guests
            </p>

            <div className="alojamiento-detail-gallery">
                {alojamiento.fotos.slice(0, 1).map((foto, index) => (
                    <img
                        key={index}
                        src={foto.path}
                        alt={`Principal`}
                        className="alojamiento-main-img"
                    />
                ))}
                {alojamiento.fotos.slice(1, 5).map((foto, index) => (
                    <img
                        key={index}
                        src={foto.path}
                        alt={`Imagen ${index + 2}`}
                        className="alojamiento-small-img"
                    />
                ))}
            </div>

            <div className="alojamiento-detail-body">
                <div className="alojamiento-detail-info">
                    <h2>Lo que ofrece este lugar</h2>
                    <ul className="alojamiento-features">
                        <li>Entire home • Private entrance</li>
                        <li>Enhanced Clean • Self check-in</li>
                        <li>Free cancellation • Wifi • Pets allowed</li>
                    </ul>

                    <TituloH3 titulo={"Descripcion"} parrafo={alojamiento.descripcion}/>
                    <TituloH3 titulo={"Dónde vas a dormir"} parrafo={"Dormitorio principal: 1 cama grande"} />

                    <TituloH3 titulo={"Comodidades"} />
                    <ul className="alojamiento-amenities">
                        {alojamiento.caracteristicas && alojamiento.caracteristicas.length > 0 ? (
                            alojamiento.caracteristicas.map((caracteristica, index) => (
                                <li key={index}>
                                    {caracteristica
                                        .replaceAll("_", " ")        // Reemplaza guiones bajos por espacios
                                        .toLowerCase()               // Minúscula general
                                        .replace(/^\w/, c => c.toUpperCase())} {/* Capitaliza la primera letra */}
                                </li>
                            ))
                        ) : (
                            <li>No se especificaron comodidades.</li>
                        )}
                    </ul>

                </div>

                <div className="alojamiento-reserva-box">
                    <ItemBox
                        precioPorNoche={alojamiento.precioPorNoche}
                        alojamientoId={alojamiento._id}
                    />

                </div>
            </div>
        </div>
    );
};

export default AlojamientoDetailPage;

