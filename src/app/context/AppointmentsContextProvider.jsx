import { appointmentsContext } from './appointmentsContext';
import { useState } from 'react';

export function AppointmentsContextProvider({ children }) {
    /**
     * States
     */
    const [appointments, setAppointments] = useState([]);

    /**
     * Functions
     */
    const updateApointments = (appointments) => setAppointments(appointments);

    /**
     * RETURN
     */
    return (
        <appointmentsContext.Provider
            value={{ appointments, updateApointments }}
        >
            {children}
        </appointmentsContext.Provider>
    );
}
