import "./alojamientos.css";
import { useEffect, useState } from "react";
import ActionAreaCard from "../../components/CardItem/CardItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filtro from "../../components/filtro/Filtro";
import { SearchBar } from "../../components/searchBar/SearchBar";
import Footer from "../../components/footer/Footer";
import PageSearch from "../../components/PageSearch/PageSearch"

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
                    huespedMax={a.cantHuespedesMax}
                    alSeleccionarItem={() => navigate(`/alojamientos/${a._id}`)}
                />
            ))}
        </div>
    );
};

const Alojamientos = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;

    const navigate = useNavigate();

    const [alojamientos, setAlojamientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [totalPages, setTotalPages] = useState(1);

    const fetchAlojamientos = async () => {
        try {
            setLoading(true);
            setError(null);

            const query = new URLSearchParams(searchParams);
            if (!query.has("page")) query.set("page", "1");
            if (!query.has("limit")) query.set("limit", "10");

            //const response = await fetch(`http://localhost:3000/alojamientos?${searchParams.toString()}`);
            const response = await fetch(`http://localhost:3000/alojamientos?${query.toString()}`);
            if (!response.ok) throw new Error("Error al cargar los alojamientos");
            const data = await response.json();

            setAlojamientos(data.alojamientos || []);
            setTotalPages(Math.ceil(data.total / data.limit));
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
            <PageSearch totalPages={totalPages} />
            <Footer />
        </section>
    );
};

export default Alojamientos;

