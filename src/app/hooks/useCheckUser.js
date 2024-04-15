import { useContext, useEffect } from 'react';
import { authContext } from '../context/authContext';
import { isValidEmail, isValidPassword } from '../utils/validations';

/**
 * Custom hook que se ejecutará cuando el usuario inicia sesión y al cargar la aplicación
 * @param {email} param email - The email of the user to login
 * @param {password} param password - The password of the user to login
 * @param {token} param token - The token of the user
 */
export const useCheckUser = ({ email, password, token }) => {
    const { updateUser, updateIsAuthentocated, updateToken } =
        useContext(authContext);

    // Decidir el porvider a utilizar para que se ejecute el useEffect
    useEffect(() => {
        if (token) {
            // Si llega un token significa que ya existe un token en el localStorage
            // TODO: VALIDAR TOKEN EN EL SERVIDOR

            const tokenLocalStorage = localStorage.getItem('access_token');
        }
        if (isValidEmail(email) && isValidPassword(password)) {
            // TODO: ENVIAR DATOS A LA API.
            // En caso de recibir el token, guardarlo en el localStorage y actualizar el contexto (isAuthenticated, user, token)
        }

        // Decidir qué hacer al destruirse el componente
        return;
    }, []);

    //Decidir qué devolver
    return;
};
