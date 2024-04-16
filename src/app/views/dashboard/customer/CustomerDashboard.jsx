import { Link, Navigate } from 'react-router-dom';

import { useAuthContext } from '../../../hooks/useAuthContext';

export function CustomerDashboard() {
    const {
        user,
        isAuthenticated,
        token,
        updateUser,
        updateIsAuthentocated,
        updateToken,
        resetToken,
    } = useAuthContext();

    return (
        <>
            <div>
                <h1>Customer Dashboard</h1>
                <Link to="/login">Login</Link>
            </div>
        </>
    );
}
