/** 
 * React
 */
import { useContext } from 'react';

/** 
 * Context
 */
import { authContext } from '../context/authContext';

/**
 * Hook personalitzat per gestionar el context d'autenticació.
 * @returns {Object} L'objecte de context d'autenticació.
 */
export const useAuthContext = () => {
    return useContext(authContext);
};