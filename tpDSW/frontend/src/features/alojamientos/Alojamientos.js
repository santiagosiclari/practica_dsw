import "./alojamientos.css"
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {AlojamientosContext} from "../../context/AlojamientosProvider";

export const Titulo = ({texto}) => {
    return <h1 className="title">{texto}</h1>
}

const CardAlojamiento = ({nombre, imagen, precio, seleccionado, alSeleccionarAlojamiento}) => {
    return <div
        className={`card ${seleccionado && "selected"}`}
        onClick={alSeleccionarAlojamiento}
    >
        <h3>{nombre}</h3>
        <img src={imagen} alt={"Imagen alojamiento"}/>
        <p className="price">${precio}</p>
    </div>
}

const ListaAlojamientos = ({alojamientos}) => {
    const navigate = useNavigate();
    return <div className="alojamientos">{
        alojamientos.map((alojamiento) => <CardAlojamiento
            key={alojamiento.id}
            nombre={alojamiento.nombre}
            imagen={alojamiento.imagen}
            precio={alojamiento.precio}
            seleccionado={alojamiento.seleccionado}
            alSeleccionarAlojamiento={() => navigate("/alojamiento/" + alojamiento.id)}// "onDishSelect"
        />)
    }</div>
}

const Alojamientos = () => {
    const {alojamientos: todosLosAlojamientos, banner, error} = useContext(AlojamientosContext);
    const [alojamientos, setAlojamientos] = useState(todosLosAlojamientos);

    if(error){
        return <div className="error">HUBO UN ERROR AL CARGAR LOS ALOJAMIENTOS:{error}</div>
    }

    return (
        <section className="home">
            <div className="content">
                <Titulo texto="Alojamiento"/>
                <div>{banner}</div>
                <ListaAlojamientos
                    alojamientos={alojamientos}
                />
            </div>
        </section>
    )
};

export default Alojamientos;