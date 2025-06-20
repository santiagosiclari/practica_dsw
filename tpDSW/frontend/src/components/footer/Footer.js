import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-columns">
                <div className="footer-column">
                    <h4>Soporte</h4>
                    <ul>
                        <li><a href="#">Centro de ayuda</a></li>
                        <li><a href="#">Información segura</a></li>
                        <li><a href="#">Opciones de cancelamiento</a></li>
                        <li><a href="#">COVID-19</a></li>
                        <li><a href="#">Soporte a discapacidades</a></li>
                        <li><a href="#">Reportes</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Comunidad</h4>
                    <ul>
                        <li><a href="#">Problemas por desastres</a></li>
                        <li><a href="#">Ayuda a refugios</a></li>
                        <li><a href="#">Diversidad</a></li>
                        <li><a href="#">Lucha la discriminación</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Hosting</h4>
                    <ul>
                        <li><a href="#">Vuelvete un host</a></li>
                        <li><a href="#">AirCover</a></li>
                        <li><a href="#">Recursos</a></li>
                        <li><a href="#">Foro de la comunidad</a></li>
                        <li><a href="#">Cómo ser host</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Sobre</h4>
                    <ul>
                        <li><a href="#">Newsroom</a></li>
                        <li><a href="#">Nuevas funciones</a></li>
                        <li><a href="#">Carta de los fundadores</a></li>
                        <li><a href="#">Carreras</a></li>
                        <li><a href="#">Inversores</a></li>
                        <li><a href="#">¡Desarrollo de software!</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Roli SA, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Sitemap</a></p>
                <div className="footer-icons">
                    🌐 Español (AR) &nbsp;·&nbsp; $ ARS &nbsp;&nbsp;
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </footer>
    );
}
