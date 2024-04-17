import { useAuthContext } from '../../../hooks/useAuthContext';

import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => {
    const { isAuthenticated } = useAuthContext();

    return (
        <header className="header">
            <div>
                <p>Header</p>
            </div>
            <div>
                {
                    // Es necessita un color invertit o algo així pel Footer i el Header. Tal com està ara els links son del mateix color que el fons del header
                }
                {isAuthenticated ? (
                    <p>Link Logout</p>
                ) : (
                    <Link to={'/login'} style={{ color: 'black' }}>
                        Link Login
                    </Link>
                )}
            </div>
        </header>
    );
};
