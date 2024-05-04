/**
 *  React
 */
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

/**
 *  Calendar
 */
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importa el locale español
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

/**
 *  Custom hooks
 */
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCheckUser } from '../../../hooks/useCheckUser';
import { useAppointmentsContext } from '../../../hooks/useAppointmentsContext';

/**
 * Components propis
 */
import { Header } from '../../../shared/components/Header/Header';

/**
 * Estils
 */
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CustomerDashboard.scss';

// moment.locale("es")

moment.locale('es', {
    week: {
        dow: 1, // Dilluns com a primer dia de la setmana
    },
});

const localizer = momentLocalizer(moment);

/**
 * Component de dashboard per a clients.
 * Mostra el calendari amb les seves reserves.
 * @returns {JSX.Element} El component del dashboard del client.
 */
export function CustomerDashboard() {
    /**
     * Estats
     */
    const { user, isAuthenticated } = useAuthContext();
    const [myEventsList, setMyEventsList] = useState([]);
    const { checkToken } = useCheckUser();
    const { allAppointments, updateAllApointments, deleteAppointment } =
        useAppointmentsContext();

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        const filteredEvents = allAppointments.filter(
            (appointment) => appointment.userId === user?.id,
        );
        setMyEventsList(filteredEvents);
    }, [allAppointments]);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    /**
     * Handler per seleccionar un event del calendari.
     * @param {object} eventInfo La informació de l'event seleccionat.
     */
    const handleSelectEvent = (eventInfo) => {
        deleteAppointment(eventInfo);
        // Elimina l'event passat per paràmetre
        const updatedEvents = allAppointments.filter(
            (ev) => ev.id !== eventInfo.id,
        );
        updateAllApointments(updatedEvents);
    };

    const minTime = new Date();
    minTime.setHours(8, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(18, 0, 0);

    return (
        <>
            <Header />
            <div className="dashboard__container">
                <h1>Customer Dashboard</h1>
                <div className="dashboard__mainSection">
                    <div className="dashboard__benvinguda">
                        <div>Benvingut {user?.name}</div>
                    </div>
                    {myEventsList.length > 0 && (
                        <>
                            <div className="dashboard__calendarEvents">
                                Actualment tens{' '}
                                <strong>{myEventsList.length}</strong> event(s)
                                al calendari
                            </div>
                            <div className="dashboard__description">
                                Fes click sobre una reserva per eliminar-la
                            </div>
                        </>
                    )}
                    {myEventsList.length === 0 && (
                        <div className="dashboard__calendarEvents">
                            No tens cap event al calendari
                        </div>
                    )}

                    <div className="dashboard__calendar">
                        <Calendar
                            localizer={localizer}
                            events={myEventsList}
                            defaultDate={new Date()}
                            defaultView="week"
                            // defaultView="month"
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            selectable={true}
                            // onSelectSlot={handleSelectSlot}
                            onSelectEvent={handleSelectEvent}
                            slotDuration={60}
                            step={60}
                            timeslots={1}
                            min={minTime}
                            max={maxTime}
                            culture="es"
                            toolbar={true}
                            formats={{
                                timeGutterFormat: 'HH:mm',
                                dayFormat: (date, culture, localizer) =>
                                    // Format dels dies a la vista de setmana
                                    localizer.format(date, 'dddd', culture), 
                                agendaTodayLabel: {
                                    long: 'Hoy', // Etiqueta per l'opció "Hoy" a la vista d'agenda
                                    short: 'Hoy', // Etiqueta curta per a l'opció "Hoy" a la vista d'agenda
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
