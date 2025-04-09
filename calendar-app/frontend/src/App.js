import React, { useState, useEffect } from "react";
import MainLayout from "./components/MainLayout";
import CalendarView from "./components/CalendarView";
import EventListView from "./components/EventListView";
import EditEventModal from "./components/EditEventModal";
import AddEventModal from "./components/AddEventModal";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import "./styles/index.css";

// Root component of the application
export default function App() {
   // State for current view mode: 'calendar' or 'list'
  const [view, setView] = useState("calendar");

  // Event data and modal states
  const [events, setEvents] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addDefaultDate, setAddDefaultDate] = useState(null);

   // Toast notification state
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [showToast, setShowToast] = useState(false);

  // Load events on first render
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events from backend API
  const fetchEvents = () => {
    axios
      .get("http://localhost:3001/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  };

  // Open edit modal with selected event
  const handleEditEvent = (event) => {
    setEventToEdit(event);
    setEditModalOpen(true);
  };

  // Triggered when user clicks an empty day in the calendar
  const handleAddEventFromCalendar = (date) => {
    const start = new Date(date);
    start.setHours(10, 0, 0, 0);
    const end = new Date(date);
    end.setHours(11, 0, 0, 0);
    setAddDefaultDate({ start, end });
    setAddModalOpen(true);
  };

  // Display a toast message with given text and variant (success, danger, etc.)
  const showMessage = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <>
    {/* Main layout with navigation and view switching */}
      <MainLayout onNavChange={setView}>
        {view === "calendar" && (
          <CalendarView
            events={events}
            onAddEvent={handleAddEventFromCalendar}
            onEventSelect={handleEditEvent}
          />
        )}
        {view === "list" && (
          <EventListView
            events={events}
            onEventDeleted={() => {
              fetchEvents();
              showMessage("Tapahtuma poistettu", "danger");
            }}
            onEventEdit={handleEditEvent}
          />
        )}
      </MainLayout>

      {/* Modal to add a new event */}
      <AddEventModal
        show={addModalOpen}
        onHide={() => {
          setAddModalOpen(false);
          setAddDefaultDate(null);
        }}
        defaultDate={addDefaultDate}
        onEventAdded={() => {
          fetchEvents();
          showMessage("Tapahtuma lisätty", "success");
        }}
      />

      {/* Modal to edit or delete an existing event */}
      <EditEventModal
        show={editModalOpen}
        onHide={() => setEditModalOpen(false)}
        event={eventToEdit}
        onSave={() => {
          fetchEvents();
          showMessage("Tiedot tallennettu", "success");
        }}
        onDelete={() => {
          fetchEvents();
          showMessage("Tapahtuma poistettu", "danger");
          setEditModalOpen(false);
        }}
      />

      {/* Toast notification shown in the top-right corner */}
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
