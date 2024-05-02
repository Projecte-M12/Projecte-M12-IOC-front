export const dateAppointmentToDbDate = (date) => {
    const fecha = new Date(date);

    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const hourAppointmentToDbTime = (date) => {
    const fecha = new Date(date);

    const hour = String(fecha.getHours()).padStart(2, '0');
    const minutes = String(fecha.getMinutes()).padStart(2, '0');

    return `${hour}:${minutes}`;
};

export const dateCuteTransform = (date) => {
    const fecha = new Date(date);
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
}

