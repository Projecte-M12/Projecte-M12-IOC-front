import { Link } from 'react-router-dom';

import { useAuthContext } from '../../../hooks/useAuthContext';

export function CompanyDashboard() {
    /**
     * States
     */
    const {
        updateUser,
        resetUser,
        updateIsAuthenticated,
        updateToken,
        resetToken,
    } = useAuthContext();

    return (
        <>
            <div>
                <h1>Company Dashboard</h1>
                <Link to="/login">Login</Link>
            </div>
        </>
    );
}
