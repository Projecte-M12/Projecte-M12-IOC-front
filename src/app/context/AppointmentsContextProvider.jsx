import { useEffect } from 'react';
import { appointmentsContext } from './appointmentsContext';
import { useState } from 'react';

export function AppointmentsContextProvider({ children }) {
    /**
     * States
     */
    const [allAppointments, setAllAppointments] = useState([]);
    // const [customerAppointments, setCustomerAppointments] = useState([]);
    // const [providerAppointments, setProviderAppointments] = useState([]);
    const [lastId, setLastId] = useState(0);

    useEffect(() => {
        // TODO: Llamada a la API para obtener las reservas de todos los clientes y proveedores.
        getAllAppointments();

        // TODO: Obtener el último id de las reservas en la BD y asignarlo a lastId.
        const highestId = allAppointments.reduce((maxId, currentItem) => {
            return Math.max(maxId, currentItem.id);
        }, 0);
        setLastId(highestId);

    }, []);

    /**
     * Functions
     */
    const updateAllApointments = (appointments) => {
        setAllAppointments(appointments);
        // TODO: Llamada a la API para actualizar las reservas
    };
    // const updateCustomerAppointments = (appointments) => {
    //     setCustomerAppointments(appointments);
    // };
    // const updateProviderAppointments = (appointments) => {
    //     setProviderAppointments(appointments);
    // };

    const getAllAppointments=() => {
        // TODO: Llamada a la API para obtener las reservas
        return []
    }

    /**
     * RETURN
     */
    return (
        <appointmentsContext.Provider
            value={{
                lastId,
                setLastId,
                allAppointments,
                updateAllApointments,
            }}
        >
            {children}
        </appointmentsContext.Provider>
    );
}
