import { useAuthContext } from '../../../hooks/useAuthContext';
import './Header.scss';

export const Header = () => {
    const { isAuthenticated } = useAuthContext();

    return (
        <header className="header">
            <div>
                <p>Header</p>
            </div>
            <div>
                {isAuthenticated ? <p>Botó Logout</p> : <p>Botó Login</p>}
            </div>
        </header>
    );
};
