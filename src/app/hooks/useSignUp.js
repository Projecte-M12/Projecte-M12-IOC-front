/**
 * React
 */
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Custom Hooks
 */
import { API_BASE_URL, EDPOINT } from '../utils/constants';
import { useAuthContext } from './useAuthContext';


/**
 * Hook personalitzat per gestionar el registre d'usuari.
 * @returns {Object} L'objecte amb les funcions i estats per gestionar el registre.
 */
export const useSignup = () => {
    /**
     * Estats
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
     * Estats del contaxt
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

    const handleIsCompanyChange = () => {
        setIsCompany((prev) => !prev);
    };

    const handleServicesChange = (event) => {
        setServices(event.target.value);
    };

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
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
                      is_provider: isCompany,
                      company_name: name,
                      service_provided: services,
                      image_url: image_url,
                      remember,
                  }
                : {
                      name,
                      email,
                      password,
                      password_confirmation: passwordConfirmation,
                      is_provider: isCompany,
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

            const data = await response.json();

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
     * Retorna l'objecte amb les funcions i estats per gestionar el registre.
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
