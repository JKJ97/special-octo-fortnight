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

const locales = { fi };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { locale: fi }),
  getDay,
  locales,
});

export default function CalendarView({ events, onAddEvent, onEventSelect }) {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

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

  const handleSelectSlot = ({ start }) => {
    if (onAddEvent) {
      onAddEvent(start);
    }
  };

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

  return (
    <div style={{ height: '75vh', backgroundColor: 'white', padding: '1rem', borderRadius: '8px' }}>
      <Calendar
        localizer={localizer}
        culture="fi"
        messages={messages}
        formats={{
          weekdayFormat: (date) => format(date, 'EE', { locale: fi }),
        }}
        events={events.map((e) => ({
          ...e,
          start: new Date(e.start_time),
          end: new Date(e.end_time),
        }))}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => onEventSelect(event)}
        view={view}
        date={date}
        onNavigate={(newDate) => setDate(new Date(newDate))}
        onView={(newView) => setView(newView)}
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventPropGetter}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
