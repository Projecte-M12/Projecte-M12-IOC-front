/**
 *  React
 */
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';

/**
 *  Calendar
 */
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importa el locale español
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

/**
 *  Components propis
 */
import { Header } from '../../../shared/components/Header/Header';

/**
 *  Custom hooks
 */
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect } from 'react';
import { useCheckUser } from '../../../hooks/useCheckUser';
import { useAppointmentsContext } from '../../../hooks/useAppointmentsContext';

/**
 *  Utils
 */
import {
    dateCuteTransform,
    hourAppointmentToDbTime,
} from '../../../utils/formatDates';

/**
 *  Estils
 */
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CompanyDashboard.scss';


moment.locale('es', {
    week: {
        dow: 1, // Dilluns com a primer dia per a una setmana
    },
});

const localizer = momentLocalizer(moment);

/**
* Component de dashboard per a les empreses.
* Mostra el calendari amb les reserves de la companyia.
* @returns {JSX.Element} El component del dashboard de l'empresa.
*/
export function CompanyDashboard() {
    /**
     * Estats
     */
    const { user, isAuthenticated } = useAuthContext();
    const [myEventsList, setMyEventsList] = useState([]);
    const { checkToken } = useCheckUser();
    const { allAppointments, updateAllApointments, deleteAppointment } =
        useAppointmentsContext();

    // Estat per l'event sel·leccionat 
    const [selectedEvent, setSelectedEvent] = useState(null);
    // Estat per controlar la visibilitat del modal
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        // L'endpoint user retorna error quan es fa el login d'una empresa. 
        // No deixa entrar al dashboard perquè el token és incorrecte.
        checkToken(); 
    }, []);

    useEffect(() => {
        const filteredEvents = allAppointments.filter(
            (appointment) => appointment.companyId === user?.id,
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
        console.log(eventInfo)
        setSelectedEvent(eventInfo);
        setModalIsOpen(true);
    };

    /**
     * Handler per tancar el modal.
     */
    const closeModal = () => {
        setSelectedEvent(null);
        setModalIsOpen(false);
    };

    /**
     * Handler per eliminar un event.
     */
    const handleDeleteEvent = () => {
        deleteAppointment(selectedEvent);
        //Elimina el evento pasado por parámetro
        const updatedEvents = allAppointments.filter(
            (ev) => ev.id !== selectedEvent.id,
        );
        updateAllApointments(updatedEvents);
        // Xivato
        console.log('Event eliminat:', selectedEvent);
        // Tanca el modal
        closeModal();
    };

    const minTime = new Date();
    minTime.setHours(8, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(18, 0, 0);

    return (
        <>
            <Header />
            <div className="dashboard__container">
                <h1>{user.name} Dashboard</h1>
                <div className="dashboard__mainSection">
                    <div className="dashboard__benvinguda">
                        <div>Benvingut </div>
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
                                    localizer.format(date, 'dddd', culture), // Formato de los días en la vista de semana
                                agendaTodayLabel: {
                                    long: 'Hoy', // Etiqueta para la opción "Hoy" en la vista de agenda
                                    short: 'Hoy', // Etiqueta corta para la opción "Hoy" en la vista de agenda
                                },
                            }}
                        />
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                // Configura las propiedades del modal según tus necesidades
                >
                    {/* Contenido del modal con los detalles del evento */}
                    {selectedEvent && (
                        <>
                            <h2>Detalls de la reserva</h2>
                            <p>Descripció: {selectedEvent.title}</p>
                            <p>
                                Data: {dateCuteTransform(selectedEvent.start)}
                            </p>
                            <p>
                                Hora inici:{' '}
                                {hourAppointmentToDbTime(selectedEvent.start)}
                            </p>
                            <p>
                                Hora fi:{' '}
                                {hourAppointmentToDbTime(selectedEvent.end)}
                            </p>
                            <p>Usuari: {selectedEvent.client}</p>
                            {/* Otros detalles del evento */}
                            <button onClick={handleDeleteEvent}>
                                Eliminar reserva
                            </button>
                            &nbsp;
                            <button onClick={closeModal}>Tancar</button>
                        </>
                    )}
                </Modal>
            </div>
        </>
    );
}
