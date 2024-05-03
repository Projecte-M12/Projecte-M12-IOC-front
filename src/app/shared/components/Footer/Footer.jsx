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
                        <Link to="/politiques/avis-legal">Avís Legal</Link>
                    </span>{' '}
                    |{' '}
                    <span className="paragraphs__link">
                        <Link to="/politiques/privacitat">
                            Política de privacitat{' '}
                        </Link>
                    </span>{' '}
                    |{' '}
                    <span className="paragraphs__link">
                        <Link to="/politiques/cookies">
                            Política de cookies{' '}
                        </Link>
                    </span>
                </p>
            </div>

            <div className="socials">
                <div className="social">
                    <img
                        src="https://img.icons8.com/?size=256&id=32323"
                        alt="Instagram"
                    />
                    <p>Instagram</p>
                </div>
                <div className="social">
                    <img
                        src="https://img.icons8.com/?size=256&id=118497"
                        alt="Facebook"
                    />
                    <p>Facebook</p>
                </div>
                <div className="social">
                    <img
                        src="https://img.icons8.com/?size=256&id=13930"
                        alt="LinkedIn"
                    />
                    <p>LinkedIn</p>
                </div>
            </div>
        </div>
    );
};
