import './Search.css';
import {alojamientos} from "../../mockData/alojamientos";
import AlojamientoItem from '../alojamientos/AlojamientoItem';

const Search = () => {
    return (
        <div className="search">
            <header className="search-header">
                <div className="search-left">
                    <img src="/images/logoBirbnb.png" alt="Birbnb" className="logo" />
                </div>
                <div className="search-input">
                    <input type="text" placeholder="Bordeaux" />
                    <input type="text" placeholder="Feb 19-26" />
                    <input type="text" placeholder="2 guests" />
                    <button className="search-btn">🔍</button>
                </div>
                <div className="search-right">
                    <button className="notificaciones">🔔</button>
                    <button className="menu">☰</button>
                </div>
            </header>

            <h2 className="result-title">200+ stays in Bordeaux</h2>

            <div className="alojamientos-carousel">
                {alojamientos.map((alojamiento) =>
                    <AlojamientoItem aAlojamiento = {alojamiento} key={alojamiento.id} />
                )}
            </div>
        </div>
    );
};

export default Search;