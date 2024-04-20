import { useState } from 'react';
import { API_BASE_URL, EDPOINT } from '../utils/constants';
import { useAuthContext } from './useAuthContext';

/**
 * Custom hook para manejar el inicio de sesión
 */
export const useSignup = () => {
    /**
     * States
     */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isCompany, setIsCompany] = useState(false);
    const [services, setServices] = useState('');
    const [remember, setRemember] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Custom hooks
     */
    const {
        updateUser,
        updateIsAuthenticated,
        updateToken,
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

    const handlePasswordConfirmationChange = (event) => {
        setPasswordConfirmation(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleIsCompanyChange = (event) => {
        setIsCompany(prev => !prev);
    };

    const hadleServide = (event) => {
        setServices(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            // TODO: Falta implementar el signal para evitar sobrecarga de llamadas
            const controller = new AbortController();

            const optionsFetchUserInfo = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: email,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                    is_company: isCompany,
                    company_name: name,
                    service_provided: 'servei prova', //services,
                    remember,
                }),
                // signal: controller.signal,
            };

            const response = await fetch(
                API_BASE_URL + EDPOINT.SIGNUP,
                optionsFetchUserInfo,
            );

            if (!response.ok) throw new Error('Error al registrar el usuario');

            console.log('Haciendo cosas del signup...');

            const data = await response.json();
            console.log('Recibe respuesta del servico')
            console.log(data)
            // updateIsAuthenticated(true);
            // updateToken(data.access_token);
            // updateUser(data.user);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Return
     */
    return {
        email,
        password,
        passwordConfirmation,
        loading,
        error,
        isCompany,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleNameChange,
        handleIsCompanyChange,
        hadleServide,
        handleSubmit,
    };
};
