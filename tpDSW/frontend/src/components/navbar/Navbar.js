import './Navbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaceholderDoble, PlaceholderSimple } from '../placeholder_input/PlaceholderInput';
import UserBoton from '../user_boton/UserBoton';

const Navbar = () => {
    const navigate = useNavigate();

    const [ubicacion, setUbicacion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [cantHuespedes, setCantHuespedes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const queryParams = new URLSearchParams();

        if (ubicacion) queryParams.append('ciudad', ubicacion);
        if (fechaInicio) queryParams.append('fechaInicio', fechaInicio);
        if (fechaFinal) queryParams.append('fechaFinal', fechaFinal);
        if (cantHuespedes) queryParams.append('cantHuespedes', cantHuespedes);

        navigate(`/alojamientos?${queryParams.toString()}`);
    };

    return (
        <header className="navbar-bg">
            <div className="navbar-content">
                <div className="navbar-logo">
                    <img src="/images/logoBirbnb.png" alt="Birbnb logo" />
                </div>

                <form className="search-box" onSubmit={handleSubmit}>
                    <PlaceholderSimple
                        tipo="text"
                        placeInicial="Ubicación"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                    />
                    <PlaceholderDoble
                        tipo="date"
                        placeInicial="Fecha Inicial"
                        placeFinal="Fecha Final"
                        valueInicio={fechaInicio}
                        valueFinal={fechaFinal}
                        onChangeInicio={(e) => setFechaInicio(e.target.value)}
                        onChangeFinal={(e) => setFechaFinal(e.target.value)}
                    />
                    <PlaceholderSimple
                        tipo="number"
                        placeInicial="Huespedes"
                        value={cantHuespedes}
                        onChange={(e) => setCantHuespedes(e.target.value)}
                    />
                    <button type="submit" className="search-btn">🔍</button>
                </form>

                <div className="navbar-right">
                    <span>Become a Host</span>
                    <div className="profile-toggle">
                        <button className="notificaciones-options">🔔</button>
                        <UserBoton />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
