import { useEffect } from 'react';
import { API_BASE_URL, EDPOINT } from '../utils/constants';
import { useAuthContext } from './useAuthContext';

/**
 * Custom hook para comprobar si el usuario está validado o no
 */
export const useCheckUser = () => {
    /**
     * States
     */
    const { updateUser, updateIsAuthenticated, updateToken } = useAuthContext();

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
     * Effect. Llamada a la API para hacer la comprobación
     */
    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await fetch(
                    API_BASE_URL + EDPOINT.USER,
                    optionsFetchToken,
                );
                if (response.status === 200) {
                    const data = await response.json();
                    if (data.user) {
                        updateUser(data.user);
                        updateIsAuthenticated(true);
                        updateToken(data.access_token);
                    }
                    if (data.error) console.log(`Error: ${data.error}`);
                }
            } catch (error) {
                console.log('Error al comprobar el token', error);
            }
        };
        checkToken();
    }, []);
};
