import { useParams } from "react-router-dom";
import { alojamientos } from "../../mockData/alojamientos";

const AlojamientoDetailPage = () => {
    const { title } = useParams();
    const alojamiento = alojamientos.find(p => p.title.toLowerCase() === title.toLowerCase());

    if (!alojamiento) return <div>Producto no encontrado</div>;

    return (
        <div>
            <h1>{alojamiento.title}</h1>
            <img src={alojamiento.image} alt={alojamiento.title} />
            <p>Precio: ${alojamiento.price}</p>
        </div>
    );
};

export default AlojamientoDetailPage;