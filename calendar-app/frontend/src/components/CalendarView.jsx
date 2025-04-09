import React, { useState } from 'react';
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fi from 'date-fns/locale/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from './CustomToolbar';
import '../styles/index.css';

// Localization configuration for Finnish language
const locales = { fi };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { locale: fi }),
  getDay,
  locales,
});

// Calendar view component using react-big-calendar
export default function CalendarView({ events, onAddEvent, onEventSelect }) {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Finnish translations for calendar labels
  const messages = {
    today: 'Tänään',
    previous: 'Edellinen',
    next: 'Seuraava',
    month: 'Kuukausi',
    week: 'Viikko',
    day: 'Päivä',
    agenda: 'Agenda',
    date: 'Päivämäärä',
    time: 'Aika',
    event: 'Tapahtuma',
    noEventsInRange: 'Ei tapahtumia tällä aikavälillä',
  };

   // Handle click on empty slot to trigger event creation
  const handleSelectSlot = ({ start }) => {
    if (onAddEvent) {
      onAddEvent(start);
    }
  };

  // Custom styles and hover effects for calendar days
  const dayPropGetter = () => {
    return {
      style: {
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.backgroundColor = '';
      },
    };
  };

  // Custom styles and hover effects for calendar events
  const eventPropGetter = () => {
    return {
      style: {
        backgroundColor: '#3174ad',
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.backgroundColor = '#265985';
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.backgroundColor = '#3174ad';
      },
    };
  };

  // Render the calendar UI with event and style customizations
  return (
    <div style={{ height: '75vh', backgroundColor: 'white', padding: '1rem', borderRadius: '8px' }}>
      <Calendar
        localizer={localizer}
        culture="fi"
        messages={messages}
        formats={{
          weekdayFormat: (date) => format(date, 'EEEEEE', { locale: fi }),
        }}
        events={events.map((e) => ({
          ...e,
          start: new Date(e.start_time),
          end: new Date(e.end_time),
        }))}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}                          // User clicks empty day slot
        onSelectEvent={(event) => onEventSelect(event)}          // User clicks existing event
        view={view}
        date={date}
        onNavigate={(newDate) => setDate(new Date(newDate))}     // Navigating months/weeks/days
        onView={(newView) => setView(newView)}                   // Changing view mode
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventPropGetter}
        components={{
          toolbar: CustomToolbar,                                // Custom navigation toolbar component
        }}
      />
    </div>
  );
}
