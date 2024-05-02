import { useContext } from 'react';
import { appointmentsContext } from '../context/appointmentsContext';

/**
 * Custom hook para manejar el contexto
 */
export const useAppointmentsContext = () => {
    return useContext(appointmentsContext);
};
