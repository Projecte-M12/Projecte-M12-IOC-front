// Llibreries
import React from 'react';
import { Link } from 'react-router-dom';

// Estils CSS
import './Footer.css';
import { FaFacebook, FaInstagramSquare, FaSnapchat } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

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
                       <a><FaInstagramSquare /> Instagram {' '} </a>
                    </p>
                </div>
                <div className="social">
                    <img src={"#"} alt="facebook" />
                    <p>
                        <a><FaFacebook /> Facebook {' '} </a>
                    </p>
                </div>
                <div className="social">
                    <img src={"#"} alt="twitter" />
                    <p>
                        <a><FaSquareXTwitter /> Twitter{' '} </a>
                    </p>
                </div>
                <div className="social">
                    <img src={"#"} alt="snapchat" />
                    <p>
                        <a><FaSnapchat /> Snapchat{' '} </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
