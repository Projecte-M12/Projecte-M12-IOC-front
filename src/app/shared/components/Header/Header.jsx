import { useAuthContext } from '../../../hooks/useAuthContext';
import logo from '../../../assets/logo/reservanow_logo.svg';

import { Link } from 'react-router-dom';

import './Header.scss';
import Navbar from '../Navbar/Navbar';

export const Header = () => {
    const { isAuthenticated } = useAuthContext();

    return (
        <header className="header">

            <Navbar />

            
        </header>
    );
};
