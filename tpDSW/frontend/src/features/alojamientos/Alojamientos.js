import "./alojamientos.css"
import { useContext } from "react";
import { CardItem } from "../../components/CardItem/CardItem"
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlojamientosContext } from "../../context/AlojamientosProvider";
import Filtro from "../../components/filtro/Filtro";

const ListaAlojamientos = ({ alojamientos }) => {
    const navigate = useNavigate();
    return <div className="alojamientos">{
        alojamientos.map((a) => (
            <CardItem
                key={a.id}
                nombre={a.nombre}
                imagen={a.imagen || a.image}
                precio={a.precio || a.precioPorNoche}
                seleccionado={a.seleccionado}
                alSeleccionarItem={() => navigate("/alojamiento/" + a.id)}
            />
        ))
    }</div>
}

const Alojamientos = () => {
    const { alojamientos: todosLosAlojamientos, banner, error } = useContext(AlojamientosContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    //Filtrado directo, sin estados ni efectos
    const ciudadFiltro = searchParams.get("ciudad")?.toLowerCase() || "";
    const cantHuespedes = parseInt(searchParams.get("cantHuespedes")) || 0;

    const alojamientosFiltrados = todosLosAlojamientos.filter(a => {
        const coincideCiudad = a.ciudad?.toLowerCase().includes(ciudadFiltro);
        const admiteHuespedes = !cantHuespedes || a.cantHuespedesMax >= cantHuespedes;
        return coincideCiudad && admiteHuespedes;
    });

    if (error) {
        return <div className="error">HUBO UN ERROR AL CARGAR LOS ALOJAMIENTOS: {error}</div>
    }

    return (
        <section className="home">
            <Filtro />
            <div className="content">
                <div>{banner}</div>
                {alojamientosFiltrados.length === 0 ? (
                    <div className="no-results">
                        <h3>No se encontraron alojamientos con esos filtros 😞</h3>
                        <p>Probá con otra ciudad, una fecha distinta o menos huéspedes.</p>
                        <button className="volver-btn" onClick={() => navigate("/alojamientos")}>
                            Ver todos los alojamientos
                        </button>
                    </div>
                ) : (
                    <ListaAlojamientos alojamientos={alojamientosFiltrados} />
                )}
            </div>
        </section>
    )
};

export default Alojamientos;
