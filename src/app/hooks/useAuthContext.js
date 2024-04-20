import { useContext } from 'react';
import { authContext } from '../context/authContext';

/**
 * Custom hook para manejar el contexto
 */
export const useAuthContext = () => {
    return useContext(authContext)
};
