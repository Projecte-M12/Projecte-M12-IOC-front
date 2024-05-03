/**
 * Funció que retorna la data en format 'YYYY-MM-DD'
 * @param {Date} date
 * @returns {String} YYYY-MM-DD
 */
export const dateAppointmentToDbDate = (date) => {
    const fecha = new Date(date);

    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

/**
 * Funció que retorna l'hora d'una data en format HH:mm
 * @param {Date} date
 * @returns {String} HH:mm
 */
export const hourAppointmentToDbTime = (date) => {
    const fecha = new Date(date);

    const hour = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');

    return `${hour}:${minutes}`;
};

/**
 * Funció que retorna la data en format 'DD/MM/YYYY'
 * @param {Date} date
 * @returns {String} DD/MM/YYYY
 */
export const dateCuteTransform = (date) => {
    const fecha = new Date(date);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
};
