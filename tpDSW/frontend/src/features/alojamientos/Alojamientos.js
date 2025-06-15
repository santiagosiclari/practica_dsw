import "./alojamientos.css"
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlojamientosContext } from "../../context/AlojamientosProvider";

export const Titulo = ({ texto }) => {
    return <h1 className="title">{texto}</h1>
}

const CardAlojamiento = ({ nombre, imagen, precio, seleccionado, alSeleccionarAlojamiento }) => {
    return <div
        className={`card ${seleccionado && "selected"}`}
        onClick={alSeleccionarAlojamiento}
    >
        <h3>{nombre}</h3>
        <img src={imagen} alt={"Imagen alojamiento"} />
        <p className="price">${precio}</p>
    </div>
}

const ListaAlojamientos = ({ alojamientos }) => {
    const navigate = useNavigate();
    return <div className="alojamientos">{
        alojamientos.map((alojamiento) => (
            <CardAlojamiento
                key={alojamiento.id}
                nombre={alojamiento.nombre}
                imagen={alojamiento.imagen || alojamiento.image}
                precio={alojamiento.precio || alojamiento.precioPorNoche}
                seleccionado={alojamiento.seleccionado}
                alSeleccionarAlojamiento={() => navigate("/alojamiento/" + alojamiento.id)}
            />
        ))
    }</div>
}

const Alojamientos = () => {
    const { alojamientos: todosLosAlojamientos, banner, error } = useContext(AlojamientosContext);
    const [alojamientos, setAlojamientos] = useState([]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const ciudadFiltro = searchParams.get("ciudad")?.toLowerCase() || "";
        const cantHuespedes = parseInt(searchParams.get("cantHuespedes")) || 0;

        const filtrados = todosLosAlojamientos.filter(a => {
            const coincideCiudad = a.ciudad?.toLowerCase().includes(ciudadFiltro);
            const admiteHuespedes = !cantHuespedes || a.cantHuespedesMax >= cantHuespedes;
            return coincideCiudad && admiteHuespedes;
        });

        setAlojamientos(filtrados); // 👈 acá ya no volvés a todosLosAlojamientos si no hay matches
    }, [searchParams, todosLosAlojamientos]);


    if (error) {
        return <div className="error">HUBO UN ERROR AL CARGAR LOS ALOJAMIENTOS: {error}</div>
    }

    return (
        <section className="home">
            <div className="content">
                <Titulo texto="Alojamientos" />
                <div>{banner}</div>
                {alojamientos.length === 0 ? (
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
    )
};

export default Alojamientos;
