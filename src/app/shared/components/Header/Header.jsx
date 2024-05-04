/**
 * React
 */
import { Link } from 'react-router-dom';
import { useState } from 'react';

/** Custom Hooks */
import { useLogin } from '../../../hooks/useLogin';
import { useAuthContext } from '../../../hooks/useAuthContext';

/**
 * Estils
 */
import './Header.scss';


/**
 * Component del header, el qual mostra la barra de navegació superior.
 * @returns {JSX.Element} Component del header.
 */
export const Header = () => {
    const { isAuthenticated, user } = useAuthContext();
    const { handleLogout } = useLogin();

    const [menuOpen, setMenuOpen] = useState(false);

    /**
     * Funció que alterna l'estat del menú desplegable.
     */
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div>
                <p></p>
            </div>
            <div className="header__links">
                <button className="menu-icon" onClick={toggleMenu}>
                    ☰
                </button>
                <nav className={`menu ${menuOpen ? 'open' : ''}`}>
                    {!isAuthenticated && (
                        <Link to={'/'} style={{ color: 'black' }}>
                            Inici
                        </Link>
                    )}
                    {isAuthenticated && user?.company_name && (
                        <>
                            {/* <Link to={'/perfil'} style={{ color: 'black' }}>
                                Perfil
                            </Link> */}
                            <Link
                                to={'/company-dashboard'}
                                style={{ color: 'black' }}
                            >
                                Dashboard
                            </Link>
                        </>
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
                                Dashboard
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
