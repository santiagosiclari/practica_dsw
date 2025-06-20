import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import { PlaceholderDoble, PlaceholderSimple } from '../placeholder_input/PlaceholderInput';

export const SearchBar = () => {
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
    return(
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
    )
}