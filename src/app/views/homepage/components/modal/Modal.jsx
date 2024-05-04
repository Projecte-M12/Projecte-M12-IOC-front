/**
 * React
 */
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Modal.scss';

/**
 * Modal
 */
Modal.setAppElement('#root');

/**
 * Calendari
 */
import { Calendar, momentLocalizer, Navigate } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importa el locale español
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

/**
 * Custom Hooks
 */
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useAppointmentsContext } from '../../../../hooks/useAppointmentsContext';
import { useCheckUser } from '../../../../hooks/useCheckUser';


const localizer = momentLocalizer(moment);

/**
 * Component que representa el modal para mostrar detalles de una empresa y gestionar citas.
 * @param {object} props Las propiedades del componente.
 * @param {object} props.company La información de la empresa seleccionada.
 * @param {Function} props.closeModal Función para cerrar el modal.
 * @returns {JSX.Element} El componente del modal personalizado.
 */
export const CustomModal = ({ company, closeModal }) => {
    // const [myEvent, setMyEvent] = useState([]);
    const [newAppointments, setNewAppointments] = useState([]);
    const [customerAppointments, setCustomerAppointments] = useState([]);
    const [providerAppointments, setProviderAppointments] = useState([]);
    const [visualAppointments, setVisualAppointments] = useState([]);
    const [error, setError] = useState(null);

    const { user, isAuthenticated } = useAuthContext();
    const {
        lastId,
        setLastId,
        allAppointments,
        updateAllApointments,
        createAppointment,
        deleteAppointment,
    } = useAppointmentsContext();
    const { checkToken } = useCheckUser();

    useEffect(() => {
        moment.locale('es', {
            week: {
                dow: 1, // Lunes es el primer día de la semana
            },
        });
    }, []);

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        setCustomerAppointments(
            allAppointments.filter(
                (appointment) => appointment.userId === user?.id,
            ),
        );
    }, [allAppointments, user?.id]);

    useEffect(() => {
        setProviderAppointments(
            allAppointments.filter(
                (appointment) => appointment.companyId === company?.id,
            ),
        );
    }, [allAppointments, company?.id]);

    useEffect(() => {
        const mergedAppointments = [
            ...customerAppointments,
            ...providerAppointments,
        ];

        const filteredAppointments = Array.from(
            new Set(mergedAppointments.map((item) => item.id)),
        ).map((id) => {
            return mergedAppointments.find((item) => item.id === id);
        });

        setVisualAppointments(filteredAppointments);
    }, [customerAppointments, providerAppointments]);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleSelectSlot = (slotInfo) => {
        createAppointment(company, user, slotInfo);
        const newAppointment = {
            id: lastId + 1,
            companyId: company.companyId,
            userId: user?.id,
            start: slotInfo.start,
            end: slotInfo.end,
            title: `Reserva en ${company.company_name}`,
            empresa: company.company_name,
            email: user?.email,
            color: '#66ff99',
            modification_type: user?.name,
        };

        console.log(allAppointments);
        setLastId(newAppointment.id);
        updateAllApointments([...allAppointments, newAppointment]);
    };

    const handleSelectEvent = (eventInfo) => {
        // Elimina l'event passat per paràmetre
        deleteAppointment(eventInfo)
        if (eventInfo.userId === user?.id) {
            deleteAppointment(eventInfo);
            updateAllApointments(
                allAppointments.filter(
                    (appointment) => appointment.id !== eventInfo.id,
                ),
            );
        }
        setError(null);
    };

    const minTime = new Date();
    minTime.setHours(8, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(18, 0, 0);

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
                    <p>Nom: {company.company_name}</p>
                    <p>Categoria: {company.service_provided}</p>

                    <div className="dashboard__calendar">
                        <Calendar
                            localizer={localizer}
                            events={visualAppointments}
                            defaultView={['day']}
                            defaultDate={new Date()}
                            // defaultView="month"
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 400 }}
                            onSelectSlot={handleSelectSlot}
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
                                    localizer.format(date, 'dddd', culture), // Format dels dies a la vista de setmana
                                agendaTodayLabel: {
                                    long: 'Hoy', // Etiqueta per l'opción "Hoy" a la vista d'agenda
                                    short: 'Hoy', // Etiqueta curta per l'opción "Hoy" a la vista d'agenda
                                },
                            }}
                            eventPropGetter={(
                                event,
                                start,
                                end,
                                isSelected,
                            ) => {
                                if (
                                    !customerAppointments.find(
                                        (appointment) =>
                                            appointment.id === event.id,
                                    )
                                ) {
                                    // Reserves del cleint
                                    return {
                                        style: {
                                            backgroundColor: 'grey',
                                            cursor: 'default',
                                        },
                                    };
                                } else {
                                    // Noves reserves
                                    return {
                                        style: {
                                            backgroundColor: 'green',
                                            cursor: 'pointer',
                                        },
                                    };
                                }
                            }}
                            //Permet l'edición de noves reserves
                            editable={(event) =>
                                customerAppointments.find(
                                    (appointment) =>
                                        appointment.id === event.id,
                                )
                            }
                            //Evita la edición de reservas existentes
                            selectable={(event) =>
                                customerAppointments.find(
                                    (appointment) =>
                                        appointment.id === event.id,
                                )
                            }
                        />
                    </div>
                    {/* {newAppointments.length > 0 && (
                        <>
                            <div className="modal__appointmentDatail">
                                <div className="modal__appointmentDatail__header">
                                    <p>Dades de la reserva</p>
                                </div>
                                <p>
                                    Data i hora:{' '}
                                    <strong>
                                        {newAppointments.map((e) =>
                                            new Date(e.start).toLocaleString(),
                                        )}
                                    </strong>
                                </p>
                                <p>
                                    Temps:{' '}
                                    <strong>
                                        {newAppointments.map((e) => {
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
                            <div
                                className="modal__error"
                                title="Per modificar la reserva, elimina l'anterior"
                            >
                                {error && <p>{error}</p>}
                            </div>
                        </>
                    )} */}
                </div>
            )}
        </Modal>
    );
};
