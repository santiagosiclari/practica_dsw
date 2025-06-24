import { useNavigate } from "react-router-dom";

export const Texto = ({ etiqueta, texto }) => {
    return <p><strong>{etiqueta}</strong> {texto}</p>;
};

const ModalReservaConfirmada = ({ datosReserva }) => {
    const navigate = useNavigate();

    if (!datosReserva) return null;

    const cerrarYVolver = () => {
        navigate("/alojamientos");
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Reserva Confirmada 🎉</h2>
                <Texto etiqueta="Número de Reserva: " texto={datosReserva._id} />
                <Texto etiqueta="Alojamiento: " texto={datosReserva.alojamiento.nombre} />
                <Texto etiqueta="Precio Total: $" texto={datosReserva.precioPorNoche} />
                <Texto etiqueta="Ubicación: " texto={datosReserva.alojamiento.ciudad + ", " + datosReserva.alojamiento.pais} />
                <Texto etiqueta="Cantidad de Huéspedes: " texto={datosReserva.cantHuespedes} />
                <Texto etiqueta="Fecha Alta: " texto={datosReserva.fechaAlta} />
                <Texto etiqueta="Fecha Inicio: " texto={datosReserva.fechaInicio} />
                <Texto etiqueta="Fecha Final: " texto={datosReserva.fechaFinal} />
                <button className="btn-cerrar" onClick={cerrarYVolver}>Volver a alojamientos</button>
            </div>
        </div>
    );
};

export default ModalReservaConfirmada;