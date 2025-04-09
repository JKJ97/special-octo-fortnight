import React, { useState, useEffect } from 'react';
import MainLayout from './components/MainLayout';
import CalendarView from './components/CalendarView';
import EventListView from './components/EventListView';
import EditEventModal from './components/EditEventModal';
import AddEventModal from './components/AddEventModal';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';
import './styles/index.css';

export default function App() {
  const [view, setView] = useState('calendar');
  const [events, setEvents] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addDefaultDate, setAddDefaultDate] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:3001/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  };

  const handleEditEvent = (event) => {
    setEventToEdit(event);
    setEditModalOpen(true);
  };

  const handleAddEventFromCalendar = (date) => {
    const start = new Date(date);
    start.setHours(10, 0, 0, 0);
    const end = new Date(date);
    end.setHours(11, 0, 0, 0);
    setAddDefaultDate({ start, end });
    setAddModalOpen(true);
  };

  const showMessage = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <>
      <MainLayout onNavChange={setView}>
        {view === 'calendar' && (
          <CalendarView
            events={events}
            onAddEvent={handleAddEventFromCalendar}
            onEventSelect={handleEditEvent}
          />
        )}
        {view === 'list' && (
          <EventListView
            events={events}
            onEventDeleted={() => {
              fetchEvents();
              showMessage('Tapahtuma poistettu', 'danger');
            }}
            onEventEdit={handleEditEvent}
          />
        )}
      </MainLayout>

      <AddEventModal
        show={addModalOpen}
        onHide={() => {
          setAddModalOpen(false);
          setAddDefaultDate(null);
        }}
        defaultDate={addDefaultDate}
        onEventAdded={() => {
          fetchEvents();
          showMessage('Tapahtuma lisätty', 'success');
        }}
      />

      <EditEventModal
        show={editModalOpen}
        onHide={() => setEditModalOpen(false)}
        event={eventToEdit}
        onSave={() => {
          fetchEvents();
          showMessage('Tiedot tallennettu', 'success');
        }}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toastVariant}
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
