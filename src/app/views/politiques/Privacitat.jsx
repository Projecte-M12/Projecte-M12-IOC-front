// Llibreries
import React from 'react';

// Estils CSS
import './Politiques.css';

// Components propis
import { Header } from '../../shared/components/Header/Header';
import { Footer } from '../../shared/components/Footer/Footer';

// Imatges i icons
import LarryCoffee from '../../../app/assets/images/larry_coffee.svg';

export function Privacitat() {


    return (
        <>
            {/* Contingut del Header */}
            <Header />

            {/* Contingut del component Avís Legal */}
            <div className="politics__container">
                <div className="page__title--position">
                    <h1 className="title">POLÍTIQUES DE PRIVACITAT</h1>
                </div>

                {/* Contingut principal del component */}
                <img src={LarryCoffee} alt="Larry drinks a coffee" />
                <div className="section__text">
                    <p>La nostra Política de Privacitat garanteix la protecció de les dades personals dels nostres usuaris. Tant a empreses com a particulars.</p>
                    <p>A <strong className="politics__accent-text">ReservaNOW</strong>, ens comprometem a tractar les vostres dades de forma confidencial i segura.</p>
                    <p>Utilitzem la informació recollida únicament per proporcionar els serveis sol·licitats i millorar la vostra experiència d'usuari.</p>
                    <p>No es compartiràn les vostres dades amb tercers sense el vostre consentiment explícit.</p>
                </div>
            </div>
            {/* Contingut del Footer */}
            <Footer />
        </>
    );
};