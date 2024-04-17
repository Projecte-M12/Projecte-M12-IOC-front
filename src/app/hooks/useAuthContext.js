import { useContext } from 'react';
import { authContext } from '../context/authContext';

export const useAuthContext = () => {
    return useContext(authContext)
};
