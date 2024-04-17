import { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword } from '../utils/validations';
import { API_BASE_URL, EDPOINT } from '../utils/constants';
import { useAuthContext } from './useAuthContext';

/**
 * Custom hook que se ejecutará cuando el usuario inicia sesión y al cargar la aplicación
 * @param {email} param email - The email of the user to login
 * @param {password} param password - The password of the user to login
 * @param {token} param token - The token of the user
 */
export const useCheckUser = () => {
    const [counter, setCounter] = useState(0);

    const { updateUser, updateIsAuthenticated, token, updateToken } =
        useAuthContext();

    const tokenLocalStorage = localStorage.getItem('access_token');
    // console.log(tokenLocalStorage);

    const optionsFetchToken = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${tokenLocalStorage}`,
        },
    };

    useEffect(() => {
        const checkToken = async () => {
            setCounter(counter + 1);
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
                        console.log(data);
                    }
                    if(data.error) console.log(`Error: ${data.error}`);
                }
            } catch (error) {
                console.log('Error al comprobar el token', error);
            }
        };
        checkToken();

        // return;
    }, []);
    //Decidir qué devolver
    // return;
};
