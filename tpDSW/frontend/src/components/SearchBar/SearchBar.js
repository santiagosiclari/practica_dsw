import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import { PlaceholderSimple } from '../placeholder_input/PlaceholderInput';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { construirQueryParams } from '../../utils/queryParams';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    const navigate = useNavigate();

    const [ubicacion, setUbicacion] = useState('');
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFinal, setFechaFinal] = useState(null);
    const [cantHuespedes, setCantHuespedes] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);


    const handleSubmit = (e) => {
        e.preventDefault();

        const queryParams = construirQueryParams({
            ciudad: ubicacion,
            fechaInicio: fechaInicio?.format('YYYY-MM-DD'),
            fechaFinal: fechaFinal?.format('YYYY-MM-DD'),
            cantHuespedes,
            page,
            limit
        });

        navigate(`/alojamientos?${queryParams.toString()}`);
    };

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <PlaceholderSimple
                tipo="text"
                placeInicial="Ubicación"
                value={ubicacion}
                onChange={(e) => {
                    const value = e.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    setUbicacion(value);
                }}
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
                onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (val >= 1 || isNaN(val)) setCantHuespedes(e.target.value);
                }}
            />
            <button type="submit" className="search-btn">
                <SearchIcon />
            </button>
        </form>
    );
};
