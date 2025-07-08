import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";

function CityCard({ title, image, onClick }) {
    return (
        <div className="placeholder-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <img src={image} alt={title} />
            <div className="card-title">{title}</div>
        </div>
    );
}

const HomePage = () => {
    const navigate = useNavigate();

    const handleFlexibleClick = () => {
        navigate("/alojamientos");
    };

    const handleInspirationClick = (titulo) => {
        navigate("/alojamientos?ciudad=" + titulo);
    }

    const ciudades = [
        { title: 'Misiones', image: 'https://www.hola.com/horizon/landscape/7d0ae66343e2-hoviajes-costa-rica.jpg?im=Resize=(640),type=downsize' },
        { title: 'Cordoba', image: 'https://www.bharad.es/wp-content/uploads/2017/07/india-1379273_960_720-770x516.jpg' },
        { title: 'Burzaco', image: 'https://content.r9cdn.net/rimg/dimg/17/74/0ca6e469-city-30651-1632b88f203.jpg?width=1366&height=768&xhint=2635&yhint=1507&crop=true' },
        { title: 'Lanus', image: 'https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/cinderella-castle/0724ZQ_0195MS_JLM-16x9.jpg?2023-03-06T17:58:34+00:00' }
    ];

    return (
        <div className="homepage">
            <header className="hero-section">
                <div className="hero-content">
                    <h1>¿No sabes dónde ir? <span className="highlight">Perfecto.</span></h1>
                    <div className="botonera">
                        <button onClick={handleFlexibleClick} className="flexible-btn">Ver alojamientos</button>
                        <button className="flexible-btn-secondary">Contáctanos</button>
                    </div>
                </div>
                <img
                    src="/images/patagonia.jpg"
                    alt="imagen patagonia"
                    className="hero-image"
                    style={{ filter: "brightness(70%)" }}
                />
            </header>

            <section className="suggestions-section">
                <h2 className="titulo">Inspiraciones para tu próximo viaje</h2>
                <div className="placeholder-cards">
                    {ciudades.map((ciudad, index) => (
                        <CityCard key={index} title={ciudad.title} image={ciudad.image} onClick={() => handleInspirationClick(ciudad.title)} />
                    ))}
                </div>
            </section>

            <section className="hero-section">
                <div className="hero-content">
                    <h1>Publica tu alojamiento. <span className="highlight">¡Ya mismo!</span></h1>
                    <div className="botonera">
                        <button className="flexible-btn">Publicar</button>
                        <button className="flexible-btn-secondary">Dudas frecuentes</button>
                    </div>
                </div>
                <img
                    src="https://news.airbnb.com/wp-content/uploads/sites/4/2019/12/146A9841.jpg"
                    alt="imagen patagonia"
                    className="hero-image"
                />
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
