import './Carousel.css';
import { alojamientos } from '../../mockData/alojamientos';
import AlojamientoItem from '../alojamientos/AlojamientoItem';

const Carousel = () => {
    return (
        <div className="alojamientos-carousel">
            {alojamientos.map((alojamiento) =>
                <AlojamientoItem aAlojamiento = {alojamiento} key={alojamiento.id} />
            )}
        </div>
    )

};

export default Carousel;