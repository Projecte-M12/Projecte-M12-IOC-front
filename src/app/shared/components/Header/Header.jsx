import { useAuthContext } from '../../../hooks/useAuthContext';

import { Link } from 'react-router-dom';

import './Header.scss';
import { useLogin } from '../../../hooks/useLogin';
import { useState } from 'react';

export const Header = () => {
    const { isAuthenticated, user } = useAuthContext();
    const { handleLogout } = useLogin();

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div>
                <p>Header</p>
            </div>
            <div className="header__links">
                <button className="menu-icon" onClick={toggleMenu}>
                    ☰
                </button>
                <nav className={`menu ${menuOpen ? 'open' : ''}`}>
                    <Link to={'/'} style={{ color: 'black' }}>
                        Inici
                    </Link>
                    {isAuthenticated && user?.company_name && (
                        <Link
                            to={'/company-dashboard'}
                            style={{ color: 'black' }}
                        >
                            Company dashboard
                        </Link>
                    )}
                    {isAuthenticated && !user?.company_name && (
                        <>
                            <Link to={'/homepage'} style={{ color: 'black' }}>
                                Serveis
                            </Link>
                            <Link
                                to={'/customer-dashboard'}
                                style={{ color: 'black' }}
                            >
                                User dashboard
                            </Link>
                        </>
                    )}
                    {isAuthenticated ? (
                        <Link
                            to={'/'}
                            onClick={handleLogout}
                            style={{ color: 'black' }}
                        >
                            Logout
                        </Link>
                    ) : (
                        <>
                            <Link to={'/login'} style={{ color: 'black' }}>
                                Login
                            </Link>
                            <Link to={'/signup'} style={{ color: 'black' }}>
                                Signup
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};
