import './Navbar.css';

const Navbar = () => {
    return (
        <header className="navbar-bg">
            <div className="navbar-content">

                <div className="navbar-logo">
                    <img src="/images/logoBirbnb.png" alt="Birbnb logo" />
                </div>

                <form className="search-box">
                    <input type="text" className="search-input" placeholder="Ubicación" />
                    <input type="text" className="search-input" placeholder="Fechas" />
                    <input type="number" className="search-input" placeholder="Huéspedes" />
                    <button className="search-btn">🔍</button>
                </form>

                <div className="navbar-right">
                    <span>Become a Host</span>
                    <span>🔔</span>
                    <div className="profile-toggle">
                        <span>☰</span>
                        <span>👤</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;