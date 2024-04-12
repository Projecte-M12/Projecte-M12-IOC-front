// Llibreries
import React from 'react';
import { Link } from 'react-router-dom';

// Estils CSS
import './Footer.css';

// Import imatges

// FUnció principal del footer
export const Footer = () => {
    return (
        <div className="footer">
            <div className="paragraphs">
                <p>
                    RESERVANOW &copy; 2024 <em>Tots els drets reservats</em>
                </p>
                <p>
                    <span className="paragraphs__link">
                        <Link to="/avis-legal">Avís Legal</Link>
                    </span>{' '}
                    |{' '}
                    <span className="paragraphs__link">
                        <Link to="/politica-de-privacitat">
                            Política de privacitat
                        </Link>
                    </span>{' '}
                    |{' '}
                    <span className="paragraphs__link">
                        <Link to="/politica-de-cookies">
                            Política de cookies
                        </Link>
                    </span>
                </p>
            </div>

            <div className="socials">
                <div className="social">
                    <img src={"#"} alt="instagram" />
                    <p>
                        NOM_XARXA
                        <br /> ??{' '}
                    </p>
                </div>
                <div className="social">
                    <img src={"#"} alt="NOM_XARXA" />
                    <p>
                        NOM_XARXA
                        <br /> ??{' '}
                    </p>
                </div>
                <div className="social">
                    <img src={"#"} alt="NOM_XARXA" />
                    <p>
                        NOM_XARXA
                        <br /> ??{' '}
                    </p>
                </div>
            </div>
        </div>
    );
};
