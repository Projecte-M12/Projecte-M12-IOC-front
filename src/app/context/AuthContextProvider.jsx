/** 
 *  React
 */
import { useState } from 'react';

/**
 * Custom hooks
 */
import { authContext } from './authContext';

/**
 * Proveeix el context per a la gestió de l'autenticació de l'usuari.
 * @param {Object} props - Propietats del component.
 * @param {JSX.Element} props.children - Els components fills.
 * @returns {JSX.Element} El component de proveïdor de context d'autenticació.
 */
export function AuthContextProvider({ children }) {
    /**
     * States
     */
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    /**
     * Functions
     */
    const updateUser = (usuario) => {
        localStorage.setItem('user', JSON.stringify(usuario));
        setUser(usuario);
    };

    const updateIsAuthenticated = (estado) => setIsAuthenticated(estado);

    const updateToken = (token) => {
        localStorage.setItem('access_token', token);
        setToken(token);
    };

    const resetUser = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const resetToken = () => {
        localStorage.removeItem('access_token');
        setToken(null);
    };

    /**
     * Retorna el proveïdor de context d'autenticació amb les seves funcions associades.
     * @returns {JSX.Element} El proveïdor de context d'autenticació.
     */
    return (
        <authContext.Provider
            value={{
                // context,
                user,
                isAuthenticated,
                token,
                updateUser,
                resetUser,
                updateIsAuthenticated,
                updateToken,
                resetToken,
            }}
        >
            {children}
        </authContext.Provider>
    );
}
