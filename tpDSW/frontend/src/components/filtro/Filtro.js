import './Filtro.css';
import {useEffect, useState} from 'react';
import { PlaceholderDoble } from '../placeholder_input/PlaceholderInput';
import { useNavigate, useLocation } from "react-router-dom";
import { construirQueryParams } from '../../utils/queryParams';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PoolIcon from '@mui/icons-material/Pool';
import PetsIcon from '@mui/icons-material/Pets';
import ClearIcon from '@mui/icons-material/Clear';

const CARACTERISTICAS_DISPONIBLES = [
    { clave: "WIFI", nombre: "Wifi", simbolo: <WifiIcon /> },
    { clave: "ESTACIONAMIENTO", nombre: "Estacionamiento", simbolo: <LocalParkingIcon /> },
    { clave: "PISCINA", nombre: "Piscina", simbolo: <PoolIcon /> },
    { clave: "MASCOTAS_PERMITIDAS", nombre: "Mascotas Permitidas", simbolo: <PetsIcon /> },
];

const Caracteristica = ({ item, toggle }) => {
    return (
        <div className={item.seleccionado ? "opcion selected" : "opcion"}
             onClick={() => toggle(item.clave)}>
            {item.simbolo} <span>{item.nombre}</span>
        </div>
    );
};

const Filtro = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [mostrarModal, setMostrarModal] = useState(false);
    const [caracteristicas, setCaracteristicas] = useState(
        CARACTERISTICAS_DISPONIBLES.map(c => ({ ...c, seleccionado: false }))
    );

    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');

    const toggleSeleccion = (clave) => {
        setCaracteristicas(prev =>
            prev.map(c =>
                c.clave === clave ? { ...c, seleccionado: !c.seleccionado } : c
            )
        );
    };

    const aplicarFiltros = () => {
        const seleccionadas = caracteristicas.filter(c => c.seleccionado).map(c => c.clave);

        const params = construirQueryParams({
            caracteristicas: seleccionadas,
            precioMin,
            precioMax,
            lat,
            long
        });

        navigate(`/alojamientos?${params.toString()}`);
        setMostrarModal(false);
    };

    const toggleModal = () => setMostrarModal(!mostrarModal);

    const [hayFiltrosAplicados, setHayFiltrosAplicados] = useState(false);

    useEffect(() => {
        const checkFiltrosAplicados = () => {
            const algunaCaracteristicaSeleccionada = caracteristicas.some(c => c.seleccionado);

            const precioMinAplicado = precioMin !== '';
            const precioMaxAplicado = precioMax !== '';

            const latAplicada = lat !== '';
            const longAplicada = long !== '';

            return algunaCaracteristicaSeleccionada ||
                precioMinAplicado || precioMaxAplicado ||
                latAplicada || longAplicada;
        };

        setHayFiltrosAplicados(checkFiltrosAplicados());
    }, [caracteristicas, precioMin, precioMax, lat, long]);

    const resetearTodosLosFiltros = () => {
        setCaracteristicas(
            CARACTERISTICAS_DISPONIBLES.map(c => ({ ...c, seleccionado: false }))
        );
        setPrecioMin('');
        setPrecioMax('');
        setLat('');
        setLong('');

        navigate("/alojamientos");
        setMostrarModal(false);
    };

    return (
        <div className="filtros-container">
            <div className="filtros">
                <button className="filter-pill" onClick={toggleModal}>Filtros extra</button>
            </div>
            {hayFiltrosAplicados && (
                <div className="filter-delete-container">
                    <button className="filter-delete" onClick={resetearTodosLosFiltros}>
                        <ClearIcon />
                    </button>
                </div>
            )}

            {mostrarModal && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-filtros" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="titulo-filtros" >Filtros</h2>
                            <button className="cerrar-btn" onClick={toggleModal}>✖</button>
                        </div>

                        <section>
                            <h4>Explora con tus necesidades</h4>
                            <div className="opciones-row">
                                {caracteristicas.map(c =>
                                    <Caracteristica key={c.clave} item={c} toggle={toggleSeleccion} />
                                )}
                            </div>
                        </section>
                        <section>
                            <h4>Rango de precios</h4>
                            <PlaceholderDoble
                                tipo={"number"}
                                placeInicial={"Minimo"}
                                placeFinal={"Maximo"}
                                valueInicial={precioMin}
                                valueFinal={precioMax}
                                onChangeInicial={e => setPrecioMin(e.target.value)}
                                onChangeFinal={e => setPrecioMax(e.target.value)}
                                step={1000}
                                min={0}
                            />
                        </section>
                        <section>
                            <h4>Coordenadas</h4>
                            <PlaceholderDoble
                                tipo={"number"}
                                placeInicial={"Latitud"}
                                placeFinal={"Longitud"}
                                valueInicial={lat}
                                valueFinal={long}
                                onChangeInicial={e => setLat(e.target.value)}
                                onChangeFinal={e => setLong(e.target.value)}
                                step={10}
                            />
                        </section>

                        <div className="acciones">
                            <button className="borrar-btn" onClick={() => window.location.href = "/alojamientos"}>
                                Borrar todo
                            </button>
                            <button className="aplicar-btn" onClick={aplicarFiltros}>Mostrar resultados</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filtro;
