import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

import { useAuthContext } from '../../../hooks/useAuthContext';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importa el locale español
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { Header } from '../../../shared/components/Header/Header';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CompanyDashboard.scss';
import { useEffect } from 'react';
import { useCheckUser } from '../../../hooks/useCheckUser';
import { useAppointmentsContext } from '../../../hooks/useAppointmentsContext';

import Modal from 'react-modal';

// moment.locale("es")

moment.locale('es', {
    week: {
        dow: 1, // Lunes es el primer día de la semana
    },
});

const localizer = momentLocalizer(moment);

export function CompanyDashboard() {
    /**
     * States
     */
    const { user, isAuthenticated } = useAuthContext();
    const [myEventsList, setMyEventsList] = useState([]);
    const { checkToken } = useCheckUser();
    const { allAppointments, updateAllApointments, deleteAppointment } =
        useAppointmentsContext();

    const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento seleccionado
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar la visibilidad del modal

    useEffect(() => {
        checkToken(); //El endpoint user retorna error quan es fa el login d'una empresa. No deixa entrar al dashboard perquè el token és incorrecte.
    }, []);

    useEffect(() => {
        const filteredEvents = allAppointments.filter(
            (appointment) => appointment.companyId === user?.id,
        );
        console.log(allAppointments);
        console.log(user.id);
        setMyEventsList(filteredEvents);
    }, [allAppointments]);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleSelectEvent = (eventInfo) => {
        setSelectedEvent(eventInfo);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setModalIsOpen(false);
    };

    const handleDeleteEvent = () => {
        deleteAppointment(selectedEvent);
        //Elimina el evento pasado por parámetro
        const updatedEvents = allAppointments.filter(
            (ev) => ev.id !== selectedEvent.id,
        );
        updateAllApointments(updatedEvents);
        console.log('Evento eliminado:', selectedEvent);
        // Luego cierra el modal
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
                            <h2>Detalles de la reserva</h2>
                            <p>Título: {selectedEvent.title}</p>
                            <p>Fecha de inicio: {selectedEvent.start.toLocaleString()}</p>
                            <p>Fecha de fin: {selectedEvent.end.toLocaleString()}</p>
                            <p>Usuari: {selectedEvent.userName}</p>
                            {/* Otros detalles del evento */}
                            <button onClick={handleDeleteEvent}>
                                Eliminar evento
                            </button>
                            <button onClick={closeModal}>Cerrar</button>
                        </>
                    )}
                </Modal>
            </div>
        </>
    );
}
