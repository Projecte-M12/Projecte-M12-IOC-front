import { useAuthContext } from '../../../hooks/useAuthContext';

import { Link } from 'react-router-dom';

import './Header.scss';
import { useLogin } from '../../../hooks/useLogin';

export const Header = () => {
    const { isAuthenticated, user } = useAuthContext();
    const { handleLogout } = useLogin();

    return (
        <header className="header">
            <div>
                <p>Header</p>
            </div>
            <div className="header__links">
                <Link to={'/'} style={{ color: 'black' }}>
                    Inici
                </Link>
                {isAuthenticated && user.is_company && (
                    <Link to={'/company-dashboard'} style={{ color: 'black' }}>
                        Company dashboard
                    </Link>
                )}
                {isAuthenticated && !user.is_company && (
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
            </div>
        </header>
    );
};
