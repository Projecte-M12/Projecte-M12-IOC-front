/**
 * Utils
 */
import { API_BASE_URL, EDPOINT } from '../utils/constants';

/**
 * Serveis
 */
import { getCompanies } from './getCompanies';

/**
 * Funció asíncrona per obtenir totes les cites de l'API.
 * @returns {Promise<Array>} Una promesa que resol amb un array de cites.
 */
export const getAllAppointments = async () => {
    // TODO: Get data from API instead of mock file
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    };

    try {
        // Obtener todas las citas
        const response = await fetch(
            API_BASE_URL + EDPOINT.APPOINTMENTS,
            options,
        );
        const appointmentsData = await response.json();

        // Obtener datos de todas las empresas
        const companiesData = await getCompanies();

        // Mapear citas y agregar información de la empresa
        const appointments = appointmentsData.map((appointment) => {
            const company = companiesData.find(
                (c) => c.id === appointment.provider_id,
            );
            return {
                start: new Date(
                    appointment.appointment_date + 'T' + appointment.start_time,
                ),
                end: new Date(
                    appointment.appointment_date + 'T' + appointment.end_time,
                ),
                id: appointment.id,
                companyId: appointment.provider_id,
                userId: appointment.user_id,
                title: `Reserva en ${company.company_name}`,
                empresa: company.company_name,
                client: appointment.modification_type,
            };
        });

        return appointments;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return []; // Devuelve un array vacío en caso de error
    }
};
