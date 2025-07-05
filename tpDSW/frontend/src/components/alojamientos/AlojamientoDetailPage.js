import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlojamientoById } from "../../api/alojamientos";
import ItemBox from "../Item-box/ItemBox";
import "./AlojamientoDetailPage.css";
import Footer from "../footer/Footer";
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PoolIcon from '@mui/icons-material/Pool';
import PetsIcon from '@mui/icons-material/Pets';
import CargandoCentrado from "../circularProgress/CircularProgress";

const CARACTERISTICA_SIMBOLOS = {
    "WIFI": <WifiIcon fontSize="small" />,
    "ESTACIONAMIENTO": <LocalParkingIcon fontSize="small" />,
    "PISCINA": <PoolIcon fontSize="small" />,
    "MASCOTAS_PERMITIDAS": <PetsIcon fontSize="small" />,
};

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

    if (loading) return <CargandoCentrado/>;
    if (error) return <div className="detail-error">{error}</div>;
    if (!alojamiento) return null;

    console.log(alojamiento.descripcion);

    return (
        <div className="alojamiento-detail-page">
            <div className="alojamiento-detail-container">
                <h1 className="alojamiento-detail-title">{alojamiento.nombre}</h1>

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

                <p className="alojamiento-host">
                    Lugar alojado por {alojamiento.anfitrionNombre} – {alojamiento.cantHuespedesMax || "X"} guests
                </p>

                <div className="alojamiento-detail-body">
                    <div className="alojamiento-detail-info">
                        <div className="caja-detalles">
                            <h1 className="titulo-caja-detalles">{"Descripción"}</h1>
                            <h2 className="descripcion-caja-detalles">{alojamiento.descripcion}</h2>
                        </div>
                        <div className="caja-detalles">
                            <h1 className="titulo-caja-detalles">{"Comodidades"}</h1>
                            <ul className="alojamiento-amenities">
                                {alojamiento.caracteristicas && alojamiento.caracteristicas.length > 0 ? (
                                    alojamiento.caracteristicas.map((caracteristica, index) => (
                                        <li key={index}>
                                            {CARACTERISTICA_SIMBOLOS[caracteristica]}
                                            <span>
                                                {caracteristica
                                                    .replaceAll("_", " ")
                                                    .toLowerCase()
                                                    .replace(/^\w/, c => c.toUpperCase())}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <li>No se especificaron comodidades.</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="alojamiento-reserva-box">
                        <ItemBox
                            precioPorNoche={alojamiento.precioPorNoche}
                            alojamientoId={alojamiento._id}
                            cantHuespedesTotal={alojamiento.cantHuespedesMax}
                        />

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AlojamientoDetailPage;

