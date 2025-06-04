import './Filtro.css';
import { useState } from 'react';
import { PlaceholderDoble } from '../placeholder_input/PlaceholderInput';

const Caracteristica = ({caracteristica, simbolo}) => {
    const [seleccionado, setSeleccionado] = useState(false);

    const toggleSeleccion= () => setSeleccionado(!seleccionado);

    return <div className={seleccionado ? "opcion selected" : "opcion"}
            onClick={toggleSeleccion}>
                {simbolo}<span>{caracteristica}</span>
            </div>
}

const Filtro = () => {
    const [mostrarModal, setMostrarModal] = useState(false);

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
                                <Caracteristica caracteristica={"Estacionamiento"} simbolo={"🅿️"} />
                                <Caracteristica caracteristica={"Pisina"} simbolo={"🏊‍♂️"} />
                                <Caracteristica caracteristica={"Mascotas Permitidas"} simbolo={"🐶"} />
                                <Caracteristica caracteristica={"Wifi"} simbolo={"🛜"} />
                            </div>
                        </section>

                        <section>
                            <h4>Rango de precios</h4>
                            <PlaceholderDoble tipo={"number"} placeInicial={"Minimo"} placeFinal={"Maximo"}/>
                        </section>

                        <section>
                            <h4>Rango de fechas</h4>
                            <PlaceholderDoble tipo={"date"} placeInicial={"Fecha inicial"} placeFinal={"Fecha final"}/>
                        </section>

                        <section>
                            <h4>Coordenadas</h4>
                            <PlaceholderDoble tipo={"number"} placeInicial={"latitud"} placeFinal={"longitud"}/>
                        </section>

                        <div className="acciones">
                            <button className="borrar-btn" onClick={toggleModal}>Borrar todo</button>
                            <button className="aplicar-btn" onClick={toggleModal}>Mostrar resultados</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filtro;