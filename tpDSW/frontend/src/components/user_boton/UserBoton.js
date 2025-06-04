import { useState } from 'react';
import './UserBoton.css';
import UserSidebar from '../user_side_bar/UserSideBar';

const UserBoton = () => {
    const [mostrarSideBar, setMostrarSideBar] = useState(false);

    const toggleSeleccion = () => setMostrarSideBar(!mostrarSideBar);

    return (
        <>
            <button
                className={mostrarSideBar ? "user-options selected" : "user-options"}
                onClick={toggleSeleccion}
            >
                🧍🏻‍♂️
            </button>
            <UserSidebar visible={mostrarSideBar} onClose={() => setMostrarSideBar(false)} />
        </>
    );
};

export default UserBoton;