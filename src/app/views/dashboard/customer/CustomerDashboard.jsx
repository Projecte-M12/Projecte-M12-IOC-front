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
import './CustomerDashboard.scss';

// moment.locale("es")

moment.locale('es', {
    week: {
        dow: 1, // Lunes es el primer día de la semana
    },
});

const localizer = momentLocalizer(moment);

export function CustomerDashboard() {
    /**
     * States
     */

    const { user, isAuthenticated } = useAuthContext();
    const [myEventsList, setMyEventsList] = useState([]);

    let events = [];

    const handleSelectSlot = (slotInfo) => {
        const reserva = {
            id: 1,
            start: slotInfo.start,
            end: slotInfo.end,
            title: `Reserva en Restaurante XXXX`,
            empresa: 'XXXX',
            email: `${user?.email}`,
            color: '#FF5733',
            description: 'Reserva para una cena especial en el restaurante',
            personas: 4,
        };
        events = [...myEventsList, reserva];
        setMyEventsList(events);
        console.log('Reserva', reserva);
        console.log('myEventsList', myEventsList);
    };

    const handleSelectEvent = (eventInfo) => {
        //Elimina el evento pasado por parámetro
        const updatedEvents = myEventsList.filter(
            (ev) => ev.id !== eventInfo.id,
        );
        setMyEventsList(updatedEvents);
        console.log('eventInfo', eventInfo);
        console.log(updatedEvents);
    };

    return (
        <>
            <Header />
            <div className="dashboard__container">
                <h1>Customer Dashboard</h1>
                <div className="dashboard__mainSection">
                    <div className="dashboard__benvinguda">
                        <div>Benvingut {user.name}</div>
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
                            // defaultView="month"
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 600 }}
                            selectable={true}
                            onSelectSlot={handleSelectSlot}
                            onSelectEvent={handleSelectEvent}
                            slotDuration={60}
                            step={60}
                            timeslots={1}
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
            </div>
        </>
    );
}
