import './Navbar.css';
import { PlaceholderSimple } from '../placeholder_input/PlaceholderInput';
import UserBoton from '../user_boton/UserBoton';

const Navbar = () => {

    return (
        <header className="navbar-bg">
            <div className="navbar-content">

                <div className="navbar-logo">
                    <img src="/images/logoBirbnb.png" alt="Birbnb logo" />
                </div>

                <form className="search-box">
                    <PlaceholderSimple tipo={"text"} placeInicial={"Ubicación"}/>
                    <PlaceholderSimple tipo={"date"} placeInicial={"Fechas"}/>
                    <PlaceholderSimple tipo={"number"} placeInicial={"Huéspedes"}/>
                    <button className="search-btn">🔍</button>
                </form>

                <div className="navbar-right">
                    <span>Become a Host</span>
                    <div className="profile-toggle">
                        <button className="notificaciones-options">🔔</button>
                        <UserBoton />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;