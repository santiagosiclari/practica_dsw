import "./AlojamientoItem.css";
import { Link } from "react-router-dom";   

const AlojamientoItem = ({ aAlojamiento, key }) => {

    return (
        <div className="alojamiento-item" key={key}>
            <img src={aAlojamiento.image} alt={aAlojamiento.title} />
            <Link to={`/alojamientos/${aAlojamiento.title.toLowerCase()}`}><h3>{aAlojamiento.title}</h3></Link>
            <p>${aAlojamiento.price}</p>
        </div>
    );

};

export default AlojamientoItem;