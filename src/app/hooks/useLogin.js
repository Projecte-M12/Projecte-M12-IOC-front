import { useState } from 'react';
import { API_BASE_URL, EDPOINT } from '../utils/constants';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const { updateUser, updateIsAuthenticated, updateToken, resetToken } =
        useAuthContext();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

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
            console.log(data);
            updateIsAuthenticated(true);
            updateToken(data.access_token);
            updateUser(data.user);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        updateIsAuthenticated(false);
    };

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
