/** 
 *  React
 */
import { useContext } from 'react';

/** 
 *  Context
 */
import { appointmentsContext } from '../context/appointmentsContext';

/**
 * Hook personalitzat per gestionar el context de les cites.
 * @returns {Object} L'objecte de context de les cites
 */
export const useAppointmentsContext = () => {
    return useContext(appointmentsContext);
};
