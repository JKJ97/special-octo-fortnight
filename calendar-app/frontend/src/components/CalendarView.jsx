import React, { useState } from 'react';
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fi from 'date-fns/locale/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomToolbar from './CustomToolbar';

const locales = { fi };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { locale: fi }),
  getDay,
  locales,
});

export default function CalendarView({ events }) {
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
        view={view} // Controlled view
        date={date} // Controlled date
        onNavigate={(newDate) => setDate(new Date(newDate))} // Update date
        onView={(newView) => setView(newView)} // Update view
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}