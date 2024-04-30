import { useState } from 'react';
import { API_BASE_URL, EDPOINT } from '../utils/constants';
import { useAuthContext } from './useAuthContext';
import { Navigate } from 'react-router-dom';

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
    const [companyName, setCompanyName] = useState('');
    const [image_url, setImage_url] = useState('');
    const [remember, setRemember] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    /**
     * Custom hooks
     */
    const { updateUser, updateIsAuthenticated, updateToken } = useAuthContext();

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
        setIsCompany((prev) => !prev);
    };

    const handleServicesChange = (event) => {
        setServices(event.target.value);
    };

    const handleCompanyNameChange = (event) => {
        setImage_url(event.target.value);
    };

    const handleImageUrlChange = (event) => {
        setImage_url(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError(null);

            // TODO: Falta implementar el signal para evitar sobrecarga de llamadas
            const controller = new AbortController();
            const newUser = isCompany
                ? {
                      name,
                      email,
                      password,
                      password_confirmation: passwordConfirmation,
                      is_company: isCompany,
                      company_name: name,
                      service_provided: services,
                      image_url,
                      remember,
                  }
                : {
                      name,
                      email,
                      password,
                      password_confirmation: passwordConfirmation,
                      is_company: isCompany,
                      remember,
                  };
            const optionsFetchUserInfo = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(newUser),
                // signal: controller.signal,
            };

            const response = await fetch(
                API_BASE_URL + EDPOINT.SIGNUP,
                optionsFetchUserInfo,
            );

            if (!response.ok) {
                const responseError = await response.json();
                console.log(responseError);
                setError(responseError);
                setMessage('Error: No ha estat possible fer el registre');
                throw new Error('Error al registrar el usuario');
            }

            console.log('Haciendo cosas del signup...');

            const data = await response.json();
            console.log('Recibe respuesta del servico');

            // Mensaje todo correcto y redirección
            setSignedUp(true);
            setMessage('Usuari registrat correctament');

            // updateIsAuthenticated(true);
            // updateToken(data.access_token);
            // updateUser(data.user);
        } catch (error) {
            setError(error);
            console.log(error);
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
        name,
        passwordConfirmation,
        isCompany,
        services,
        companyName,
        image_url,
        remember,
        signedUp,
        loading,
        message,
        error,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleNameChange,
        handleIsCompanyChange,
        handleServicesChange,
        handleCompanyNameChange,
        handleImageUrlChange,
        handleSubmit,
    };
};
