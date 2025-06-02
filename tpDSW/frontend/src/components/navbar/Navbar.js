import './Navbar.css';

const Navbar = () => {
    return (
        <header className="navbar-bg">
            <div className="navbar-logo">
                <img src="/images/logoBirbnb.png" alt="logo" />
            </div>
            <nav className="navbar">
                <div className="navbar-section left">
                    <button className="menu-icon">☰</button>
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar" />
                        <button className="search-icon">🔍</button>
                    </div>
                </div>

                <div className="navbar-section center">
                    <div className="brand">
                        <h1 className="brand-text"> 🍀 ESTO ES Birbnb</h1>
                    </div>
                </div>

                <div className="navbar-section right">
                    <button className="cart">
                        👜
                        <span className="cart-count">0</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
