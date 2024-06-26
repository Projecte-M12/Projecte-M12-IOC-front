/**
 * React 
 */
import { useState } from 'react';
/**
* Context
*/
import { API_BASE_URL, EDPOINT } from '../utils/constants';
import { useAuthContext } from './useAuthContext';

/**
 * Hook personalitzat per gestionar l'inici de sessió de l'usuari.
 * @returns {Object} L'objecte amb les funcions i estats per gestionar l'inici de sessió.
 */
export const useLogin = () => {
    /**
     * Estats
     */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    /**
     * Funcions i estats del context d'autenticació.
     */
    const {
        updateUser,
        resetUser,
        updateIsAuthenticated,
        updateToken,
        resetToken,
    } = useAuthContext();

    /**
     * Funciones
     */
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError(null);

            // TODO: Falta implementar el signal para evitar sobrecarga de llamadas
            const controller = new AbortController();

            const optionsFetchCredentials = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ email, password }),
                // signal: controller.signal,
            };

            const response = await fetch(
                API_BASE_URL + EDPOINT.LOGIN,
                optionsFetchCredentials,
            );

            if (!response.ok) {
                throw new Error("Nom d'usuari i/o contrassenya incorrectes");
            }

            const data = await response.json();
            updateIsAuthenticated(true);
            updateToken(data.access_token);
            updateUser(data.user);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        updateIsAuthenticated(false);
        resetToken();
        resetUser();
    };

    /**
     * Retorna l'objecte amb les funcions i estats per gestionar l'inici de sessió.
     */
    return {
        email,
        password,
        loading,
        error,
        handleEmailChange,
        handlePasswordChange,
        handleSubmit,
        handleLogout,
    };
};
