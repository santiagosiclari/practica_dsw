import "./AlojamientoItem.css";
import { Link } from "react-router-dom";   

const AlojamientoItem = ({ aAlojamiento, key }) => {

    return (
        <div className="alojamiento-item" key={key}>
            <img src={aAlojamiento.image} alt={aAlojamiento.nombre} />
            <Link to={`/alojamientos/${aAlojamiento.nombre.toLowerCase()}`}><h3>{aAlojamiento.nombre}</h3></Link>
            <p>${aAlojamiento.price}</p>
        </div>
    );

};

export default AlojamientoItem;