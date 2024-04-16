import { useState } from 'react';
import { API_BASE_URL, EDPOINT } from '../utils/constants';
import { useAuthContext } from './useAuthContext';
export const useLogin = (emailForm, passwordForm) => {
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
                body: JSON.stringify({ emailForm, passwordForm }),
                signal: controller.signal,
            };
            fetch(API_BASE_URL + EDPOINT.LOGIN, optionsFetchCredentials).then(
                (response) => {
                    console.log(response);
                },
            );

            updateIsAuthenticated(true);
        } catch (error) {
            setError(error);
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
