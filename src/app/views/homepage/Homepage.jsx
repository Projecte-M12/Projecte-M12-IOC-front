import { Header } from '../../shared/components/Header/Header';
import { Footer } from '../../shared/components/Footer/Footer';
import { Card } from './components/card/Card';

import './Homepage.css';

// import {useGetImage} from "../../hooks/customHooks/useGetImage";

export const Homepage = () => {
    return (
        <>
            <Header />
            <h1>Homepage</h1>
            <p className="homepage__title">Welcome to ReservaNOW</p>

            {
                <ul>
                    <Card />
                </ul>
            }
            <Footer />
        </>
    );
};
