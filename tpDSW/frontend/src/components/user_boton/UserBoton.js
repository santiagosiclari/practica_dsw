import { useState } from 'react';
import './UserBoton.css';

const Lista = ({etiqueta}) => {
    return <li>{etiqueta}</li>
}

const UserBoton = () => {
    const [mostrarMenu, setMostrarMenu] = useState(false);

    const toggleMenu = () => {
        setMostrarMenu(!mostrarMenu);
    };

    const cerrarMenu = () => {
        setMostrarMenu(false);
    };

    return (
        <div className="user-boton-wrapper">
            <button className="user-options" onClick={toggleMenu}>🧍🏻‍♂️</button>

            {mostrarMenu && (
                <div className="user-dropdown-overlay" onClick={cerrarMenu}>
                    <div className="user-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                        <div className="user-dropdown-header">
                            <h4>Mi cuenta</h4>
                            <button className="cerrar-btn" onClick={cerrarMenu}>✖</button>
                        </div>
                        <ul>
                            <Lista etiqueta={"📌 Reservas"} onClick={cerrarMenu}/>
                            <Lista etiqueta={"💬 Mensajes"} onClick={cerrarMenu}/>
                            <Lista etiqueta={"🛠 Configuración"} onClick={cerrarMenu}/>
                            <Lista etiqueta={"🚪 Cerrar sesión"} onClick={cerrarMenu}/>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserBoton;