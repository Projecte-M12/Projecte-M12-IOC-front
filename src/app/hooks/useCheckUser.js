/** React */
import { useEffect } from 'react';

/** Constants */
import { API_BASE_URL, EDPOINT } from '../utils/constants';

/** Context */
import { useAuthContext } from './useAuthContext';

/**
 * Hook personalitzat per comprovar si l'usuari està validat o no.
 * @returns {Object} L'objecte amb la funció per comprovar el token de l'usuari.
 */
export const useCheckUser = () => {
    /**
     * Estats i funcions del context d'autenticació.
     */
    const {
        updateUser,
        resetUser,
        updateIsAuthenticated,
        updateToken,
        resetToken,
    } = useAuthContext();

    /**
     * Variables
     */
    const tokenLocalStorage = localStorage.getItem('access_token');

    const optionsFetchToken = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${tokenLocalStorage}`,
        },
    };

    /**
     * Funció per comprovar el token de l'usuari.
     */
    const checkToken = async () => {
        try {
            const response = await fetch(
                API_BASE_URL + EDPOINT.USER,
                optionsFetchToken,
            );
            if (response.status === 200) {
                const data = await response.json();
                if (data.user) {
                    updateIsAuthenticated(true);
                    updateUser(data.user);
                    updateToken(data.access_token);
                }
                if (data.error) {
                    updateIsAuthenticated(false);
                    resetUser();
                    resetToken();
                    console.log(`Error: ${data.error}`);
                }
            }
        } catch (error) {
            console.log('Error al comprobar el token', error);
        }
    };
    return { checkToken };
};
