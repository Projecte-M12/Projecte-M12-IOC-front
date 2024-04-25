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
                <Link to={'/homepage'} style={{ color: 'black' }}>
                    Home
                </Link>
                {isAuthenticated && user.is_company && (
                    <Link to={'/company-dashboard'} style={{ color: 'black' }}>
                        {user.email}
                    </Link>
                )}
                {isAuthenticated && !user.is_company && (
                    <Link to={'/customer-dashboard'} style={{ color: 'black' }}>
                        Dashboard
                    </Link>
                )}
                {isAuthenticated ? (
                    <Link to={'/'} onClick={handleLogout} style={{ color: 'black' }}>
                        Logout
                    </Link>
                ) : (
                    <Link to={'/login'} style={{ color: 'black' }}>
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};
