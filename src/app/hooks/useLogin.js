import { useState } from 'react';
import { API_BASE_URL, EDPOINT } from '../utils/constants';
import { useAuthContext } from './useAuthContext';

/**
 * Custom hook para manejar el inicio de sesión
 */
export const useLogin = () => {
    /**
     * States
     */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Custom hooks
     */
    const { updateUser, resetUser, updateIsAuthenticated, updateToken, resetToken } =
        useAuthContext();

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

            if (!response.ok) throw new Error('Error al iniciar sesión');

            console.log('Haciendo cosas del login...');

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
     * Return
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
