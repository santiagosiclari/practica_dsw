import './Filtro.css';
import { useState } from 'react';
import { PlaceholderDoble } from '../placeholder_input/PlaceholderInput';
import { useNavigate, useLocation } from "react-router-dom";
import { construirQueryParams } from '../../utils/queryParams';

const CARACTERISTICAS_DISPONIBLES = [
    { clave: "WIFI", nombre: "Wifi", simbolo: "🛜" },
    { clave: "ESTACIONAMIENTO", nombre: "Estacionamiento", simbolo: "🅿️" },
    { clave: "PISCINA", nombre: "Piscina", simbolo: "🏊‍♂️" },
    { clave: "MASCOTAS", nombre: "Mascotas Permitidas", simbolo: "🐶" },
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

    return (
        <div className="filtros-container">
            <div className="filtros">
                <button className="filter-pill" onClick={toggleModal}>Filters</button>
            </div>

            {mostrarModal && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-filtros" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Filtros</h2>
                            <button className="cerrar-btn" onClick={toggleModal}>✖</button>
                        </div>

                        <section>
                            <h4>Recomendaciones para vos</h4>
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
