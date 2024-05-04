/**
 * React
 */
import { Outlet, Navigate } from 'react-router-dom';

/**
 * Context
 */
import { useAuthContext } from '../hooks/useAuthContext';
import { AppointmentsContextProvider } from '../context/AppointmentsContextProvider';

/**
 * Component que gestiona les rutes protegides de l'aplicació.
 * Redirigeix a la pàgina de login si l'usuari no està autenticat.
 * @returns {JSX.Element} El component de les rutes protegides.
 */
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
