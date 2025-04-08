import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import fi from 'date-fns/locale/fi';

const locales = { fi };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function CalendarView({ events }) {
  return (
    <div style={{ height: '75vh', backgroundColor: 'white', padding: '1rem', borderRadius: '8px' }}>
      <Calendar
        localizer={localizer}
        events={events.map(e => ({ ...e, start: new Date(e.start_time), end: new Date(e.end_time) }))}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: '100%' }}
      />
    </div>
  );
}