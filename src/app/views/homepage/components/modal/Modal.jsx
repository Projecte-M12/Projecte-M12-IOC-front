import Modal from 'react-modal';
import './Modal.scss';
Modal.setAppElement('#root');

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importa el locale español
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { useState } from 'react';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useEventCalendar } from '../../../../hooks/useEventCalendar';

moment.locale('es', {
    week: {
        dow: 1, // Lunes es el primer día de la semana
    },
});

const localizer = momentLocalizer(moment);

const CustomModal = ({ company, closeModal }) => {
    const { user, isAuthenticated } = useAuthContext();

    const [myEvent, setMyEvent] = useState([]);
    const [companyEventsList, setCompanyEventsList] = useState([]);

    const { consoleDebug } = useEventCalendar();

    let event = [];
    let companyEvents = [];

    const handleSelectSlot = (slotInfo) => {
        const reserva = {
            id: 1,
            companyId: company.companyId,
            start: slotInfo.start,
            end: slotInfo.end,
            title: `Reserva en ${company.companyName}`,
            empresa: company.companyName,
            email: `${user?.email}`,
            color: '#FF5733',
            description: '', //Crear estado y campo input para manejar la descripción de la reserva
            personas: 1, //Crear estado y campo input para manejar la descripción de la reserva,
        };
        event = [...myEvent, reserva];
        companyEvents = [...companyEventsList, reserva];
        setMyEvent(event);
        setCompanyEventsList(companyEvents);

        consoleDebug(myEvent);
        // console.log('Reserva', event);
        // console.log('companyEventsList', companyEventsList);
    };

    const handleSelectEvent = (eventInfo) => {
        //Elimina el evento pasado por parámetro
        const updatedEvents = companyEventsList.filter(
            (ev) => ev.id !== eventInfo.id,
        );
        setCompanyEventsList(updatedEvents);
        setMyEvent([]);
        console.log('eventInfo', eventInfo);
        console.log(event);
    };

    return (
        <Modal
            isOpen={company !== null}
            onRequestClose={closeModal}
            className="modal__global"
        >
            {company && (
                <div className="modal__content">
                    <div className="modal__top">
                        <div className="modal__title">
                            <h2>Detalls de l'empresa</h2>
                        </div>
                        <div className="modal__close">
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                    <p>Nom: {company.companyName}</p>
                    <p>Categoria: {company.category}</p>
                    {myEvent && (
                        <>
                            <div className="modal__appointmentDatail">
                                <div className="modal__appointmentDatail__header">
                                    <p>Dades de la reserva</p>
                                </div>
                                <p>
                                    Data i hora:{' '}
                                    <strong>
                                        {myEvent.map((e) =>
                                            new Date(e.start).toLocaleString(),
                                        )}
                                    </strong>
                                </p>
                                <p>
                                    Temps:{' '}
                                    <strong>
                                        {myEvent.map((e) => {
                                            const time = moment
                                                .duration(e.end - e.start)
                                                .asMinutes();
                                            if (time > 0) {
                                                return time + ' minuts';
                                            }
                                        })}
                                    </strong>{' '}
                                </p>
                            </div>
                            <div className="modal__info">
                                Info: Fes click sobre una reserva per
                                eliminar-la
                            </div>
                        </>
                    )}
                    <div className="dashboard__calendar">
                        <Calendar
                            localizer={localizer}
                            events={companyEventsList}
                            defaultView={['day']}
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
            )}
        </Modal>
    );
};

export default CustomModal;
