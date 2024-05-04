/** 
 *  React
 */
import { useEffect } from 'react';
import { useState } from 'react';

/** 
 *  Context
 */
import { appointmentsContext } from './appointmentsContext';
import { getAllAppointments } from '../services/getAppointments';
import { dateAppointmentToDbDate, hourAppointmentToDbTime, } from '../utils/formatDates';
import { API_BASE_URL, EDPOINT } from '../utils/constants';

/**
 * Proveeix el context per a la gestió de cites.
 * @param {Object} props - Propietats del component.
 * @param {JSX.Element} props.children - Els components fills.
 * @returns {JSX.Element} El component de proveïdor de context de cites.
 */
export function AppointmentsContextProvider({ children }) {

    /**
     * States
     */
    const [allAppointments, setAllAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState(null);
    // const [customerAppointments, setCustomerAppointments] = useState([]);
    // const [providerAppointments, setProviderAppointments] = useState([]);
    const [lastId, setLastId] = useState(0);

    useEffect(() => {
        // TODO: Llamada a la API para obtener las reservas de todos los clientes y proveedores.
        getAllAppointments().then((appointments) => {
            setAllAppointments(appointments);
        });

        // TODO: Obtener el último id de las reservas en la BD y asignarlo a lastId.
        const highestId = allAppointments.reduce((maxId, currentItem) => {
            return Math.max(maxId, currentItem.id);
        }, 0);
        setLastId(highestId);
    }, [newAppointment]);

    /**
     * Functions
     */
     /** 
     * Actualitza totes les cites.
     * @param {Object[]} appointments - Llista de cites actualitzades.
     */
    const updateAllApointments = (appointments) => {
        setAllAppointments(appointments);
        // TODO: Llamada a la API para actualizar las reservas
    };

    /**
     * Crea una nova cita.
     * @param {Object} company - Informació de l'empresa.
     * @param {Object} user - Informació de l'usuari.
     * @param {Object} slotInfo - Informació de l'interval de temps de la cita.
     */
    const createAppointment = async (company, user, slotInfo) => {
        const newApp = {
            user_id: user.id,
            provider_id: company.id,
            service_id: company.service_provided,
            appointment_date: dateAppointmentToDbDate(slotInfo.start),
            start_time: hourAppointmentToDbTime(slotInfo.start),
            end_time: hourAppointmentToDbTime(slotInfo.end),
            modification_type: user?.name,
        };

        const optionsFetchNewAppointment = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(newApp),
        };
        try {
            const createNewAppointment = await fetch(
                API_BASE_URL + EDPOINT.APPOINTMENTS,
                optionsFetchNewAppointment,
            );
            createNewAppointment.json().then((data) => {
                setNewAppointment(data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Elimina una cita existent.
     * @param {Object} eventInfo - Informació de la cita a eliminar.
     */
    const deleteAppointment = async (eventInfo) => {
        const optionsFetchNewAppointment = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        try {
            const deleteOldAppointment = await fetch(
                `${API_BASE_URL + EDPOINT.APPOINTMENTS}/${eventInfo.id}`,
                optionsFetchNewAppointment,
            );
            deleteOldAppointment.json().then((data) => {
                setNewAppointment(null);
            });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Retorna el proveïdor de context de cites amb les seves funcions associades.
     * @returns {JSX.Element} El proveïdor de context de cites.
     */
    return (
        <appointmentsContext.Provider
            value={{
                lastId,
                setLastId,
                allAppointments,
                updateAllApointments,
                createAppointment,
                deleteAppointment,
            }}
        >
            {children}
        </appointmentsContext.Provider>
    );
}
