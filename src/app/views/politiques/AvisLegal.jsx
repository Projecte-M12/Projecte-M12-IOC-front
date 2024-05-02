// Llibreries
import React from 'react';

// Estils CSS
import './Politiques.css';

// Components propis
import { Header } from '../../shared/components/Header/Header';
import { Footer } from '../../shared/components/Footer/Footer';

// Imatges i icons
import LarryCoffee from '../../../app/assets/images/larry_coffee.svg';

export function AvisLegal() {


    return (
        <>
            {/* Contingut del Header */}
            <Header />

            {/* Contingut del component Avís Legal */}
            <div className="politics__container">
                <div className="page__title--position">
                    <h1 className="title">AVÍS LEGAL</h1>
                </div>

                {/* Contingut principal del component */}
                <img src={LarryCoffee} alt="Larry drinks a coffee" />
                <div className="section__text">
                    <p>Aquest avís legal estableix les condicions d'ús del servei proporcionat per <strong className="politics__accent-text">ReservaNOW</strong>.</p>
                    <p>L'ús d'aquest servei implica l'acceptació plena i sense reserves de totes i cadascuna de les disposicions incloses en aquest avís legal.</p>
                    <p>L'usuari quedarà obligat a fer un ús adequat i lícit del portal web, d'acord amb la legislació vigent i amb aquestes condicions d'ús.</p>
                </div>
            </div>
            {/* Contingut del Footer */}
            <Footer />
        </>
    );
};