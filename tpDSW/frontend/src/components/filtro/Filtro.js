import './Filtro.css';
import { useState } from 'react';

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
                                <div className="opcion">🅿️<span>Estacionamiento</span></div>
                                <div className="opcion">🏊‍♂️<span>Piscina</span></div>
                                <div className="opcion">🐶<span>Mascotas Permitidas</span></div>
                                <div className="opcion">🛜<span>Wifi</span></div>
                            </div>
                        </section>

                        <section>
                            <h4>Rango de precios</h4>
                            <div className="rango">
                                <input type="number" placeholder="Mínimo" />
                                <span>-</span>
                                <input type="number" placeholder="Máximo" />
                            </div>
                        </section>

                        <section>
                            <h4>Rango de fechas</h4>
                            <div className="rango">
                                <input type="date" placeholder="Fecha inicial" />
                                <span>-</span>
                                <input type="date" placeholder="Fecha final" />
                            </div>
                        </section>

                        <section>
                            <h4>Coordenadas</h4>
                            <div className="rango">
                                <input type="number" placeholder="latitud" />
                                <span>-</span>
                                <input type="number" placeholder="longitud" />
                            </div>
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