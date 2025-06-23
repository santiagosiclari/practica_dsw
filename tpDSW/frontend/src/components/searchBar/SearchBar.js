import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import { PlaceholderSimple } from '../placeholder_input/PlaceholderInput';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { construirQueryParams } from '../../utils/queryParams';

export const SearchBar = () => {
    const navigate = useNavigate();

    const [ubicacion, setUbicacion] = useState('');
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFinal, setFechaFinal] = useState(null);
    const [cantHuespedes, setCantHuespedes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const queryParams = construirQueryParams({
            ciudad: ubicacion,
            fechaInicio: fechaInicio?.format('YYYY-MM-DD'),
            fechaFinal: fechaFinal?.format('YYYY-MM-DD'),
            cantHuespedes
        });

        navigate(`/alojamientos?${queryParams.toString()}`);
    };

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <PlaceholderSimple
                tipo="text"
                placeInicial="Ubicación"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Check-in"
                    value={fechaInicio}
                    onChange={setFechaInicio}
                    disablePast
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
                <DatePicker
                    label="Check-out"
                    value={fechaFinal}
                    onChange={setFechaFinal}
                    disablePast
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
            </LocalizationProvider>
            <PlaceholderSimple
                tipo="number"
                placeInicial="Huespedes"
                value={cantHuespedes}
                onChange={(e) => setCantHuespedes(e.target.value)}
            />
            <button type="submit" className="search-btn">🔍</button>
        </form>
    );
};
