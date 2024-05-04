/**
 * React
 */
import React from 'react';

/**
 * Estils
 */
import './Politiques.css';

/**
 * Components pròpis
 */
import { Header } from '../../shared/components/Header/Header';
import { Footer } from '../../shared/components/Footer/Footer';

/**
 * Imatges
 */
import LarryCoffee from '../../../app/assets/images/larry_coffee.svg';

/**
 * Component que mostra les Polítiques de Cookies.
 * @returns {JSX.Element} El component de Cookies.
 */
export function Cookies() {


    return (
        <>
            {/* Contingut del Header */}
            <Header />

            {/* Contingut del component Avís Legal */}
            <div className="politics__container">
                <div className="page__title--position">
                    <h1 className="title">POLÍTIQUES DE COOKIES</h1>
                </div>

                {/* Contingut principal del component */}
                <img src={LarryCoffee} alt="Larry drinks a coffee" />
                <div className="section__text">
                    <p>La Política de Cookies de <strong className="politics__accent-text">ReservaNOW</strong> té com a objectiu informar-vos sobre l'ús de cookies i altres tecnologies similars en el nostre lloc web.</p>
                    <p>Les cookies són petites quantitats d'informació que es desen en el vostre dispositiu i que ens ajuden a millorar la navegació i personalitzar la vostra experiència. </p>
                    <p>Utilitzem cookies, sobretot, per comprendre com interactueu amb el nostre lloc web i oferir-vos una bona experiència en la navegació, adaptat-la a vosaltres.</p>
                </div>
            </div>
            {/* Contingut del Footer */}
            <Footer />
        </>
    );
};