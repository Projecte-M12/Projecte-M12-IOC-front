import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { AppointmentsContextProvider } from '../context/AppointmentsContextProvider';

export function ProtectedRoutes() {
    const auth = useAuthContext();
    return auth.isAuthenticated ? (
        <>
            <AppointmentsContextProvider>
                <Outlet />
            </AppointmentsContextProvider>
        </>
    ) : (
        <Navigate to="/Login" replace />
    );
}
