import "./alojamientos.css";
import { useEffect, useState } from "react";
import ActionAreaCard from "../../components/CardItem/CardItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filtro from "../../components/filtro/Filtro";
import { SearchBar } from "../../components/searchBar/SearchBar";

const ListaAlojamientos = ({ alojamientos }) => {
    const navigate = useNavigate();
    return (
        <div className="alojamientos">
            {alojamientos.map((a) => (
                <ActionAreaCard
                    key={a._id}
                    nombre={a.nombre}
                    imagen={a.fotos?.[0]?.path}
                    precio={a.precioPorNoche}
                    alSeleccionarItem={() => navigate(`/alojamientos/${a._id}`)}
                />
            ))}
        </div>
    );
};

const Alojamientos = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [alojamientos, setAlojamientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAlojamientos = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`http://localhost:3000/alojamientos?${searchParams.toString()}`);
            if (!response.ok) throw new Error("Error al cargar los alojamientos");
            const data = await response.json();
            setAlojamientos(data.alojamientos || []);
        } catch (err) {
            setError(err.message);
            setAlojamientos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlojamientos();
    }, [searchParams.toString()]);

    return (
        <section className="home">
            <SearchBar />
            <Filtro />
            <div className="content">
                {loading && <p>Cargando alojamientos...</p>}
                {error && <div className="error">HUBO UN ERROR: {error}</div>}

                {!loading && alojamientos.length === 0 ? (
                    <div className="no-results">
                        <h3>No se encontraron alojamientos con esos filtros 😞</h3>
                        <p>Probá con otra ciudad, una fecha distinta o menos huéspedes.</p>
                        <button className="volver-btn" onClick={() => navigate("/alojamientos")}>
                            Ver todos los alojamientos
                        </button>
                    </div>
                ) : (
                    <ListaAlojamientos alojamientos={alojamientos} />
                )}
            </div>
        </section>
    );
};

export default Alojamientos;

