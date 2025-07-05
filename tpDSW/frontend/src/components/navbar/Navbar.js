import './Navbar.css';
import NotificacionesMenu from "../notificaciones/NotificacionesMenu";
import UsuarioMenu from "../userMenu/UsuarioMenu";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <header className="navbar-bg">
            <div className="navbar-content">
                <div className="navbar-logo" onClick={handleClick}>
                    <img src="/images/logoBirbnb.png" alt="Birbnb logo"/>
                </div>
                <div className="navbar-center">
                    <button >Inspiraciones</button>
                    <button >Experiencias</button>
                    <button >Se anfitrión</button>
                </div>

                <div className="navbar-right">
                    <div className="profile-toggle">
                        <NotificacionesMenu />
                        <UsuarioMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
