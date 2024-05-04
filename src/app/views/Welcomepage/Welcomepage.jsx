/**
 * React
 */
import React from 'react';

/** 
* Components propis
*/
import { Header } from '../../shared/components/Header/Header';
import { Footer } from '../../shared/components/Footer/Footer';
import { Button } from '../../shared/components/Button/Button';
import { InvertedButton } from '../../shared/components/InvertedButton/InvertedButton.jsx';

/**
 * Estils
 */
import '../Welcomepage/Welcomepage.css';

/** 
 * Imatges
*/
import LarryDoor from '../../../app/assets/images/larry_door.svg';

/**
 * Pàgina de benvinguda.
 * @returns {JSX.Element} El component de la pàgina de benvinguda.
 */
export const Welcomepage = () => {
    return (
        <>
            {/* Contingut del Header */}
            <Header />

            {/* Contingut principal del component */}
            <div className="welcomepage__container">
                <img src={LarryDoor} alt="Larry open a door" />
                <div className="welcomepage__slogan">
                    <span className="welcomepage__slogan-accent">Reserva </span>
                    <span className="welcomepage__slogan-text">
                        les teves cites{' '}
                    </span>
                    <span className="welcomepage__slogan-accent">
                        ràpidament{' '}
                    </span>
                    <span className="welcomepage__slogan-text">
                        amb ReservaNOW
                    </span>
                </div>

                {/* Botó el qual reenviará al formulari d'inici de sessió */}
                <Button
                    text="Log In"
                    url={'/login'}
                    isLink={true}
                    className="primary-button"
                />

                {/* Botó el qual reenviará al formulari de registre d'un nou usuari (empresa o client) */}
                <InvertedButton
                    text="Sign Up"
                    url={'/signup'}
                    isLink={true}
                    className="inverted__primary-button"
                />
            </div>

            {/* Contingut del Footer */}
            <Footer />
        </>
    );
};
