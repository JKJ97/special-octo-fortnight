import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const locales = {
  'fi': require('date-fns/locale/fi'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function BigCalendarView() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/events')
      .then(res => {
        const formattedEvents = res.data.map(event => ({
          title: event.title,
          start: new Date(event.start_time),
          end: new Date(event.end_time)
        }));
        setEvents(formattedEvents);
      })
      .catch(err => console.error('Virhe haettaessa tapahtumia:', err));
  }, []);

  return (
    <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px' }}>
      <div style={{ height: '70vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={(slotInfo) => {
            setSelectedDate(slotInfo.start);
          }}
          onSelectEvent={(event) => {
            setSelectedDate(event.start); // valitaan päivän tapahtumasta
          }}
        />
      </div>

      {selectedDate && (
        <div className="mt-4 bg-white text-black p-4 rounded shadow">
          <h2 className="text-lg font-bold">
            Tapahtumat päivälle {selectedDate.toLocaleDateString()}
          </h2>
          <ul>
            {events
              .filter(event => {
                const eventDate = new Date(event.start);
                return (
                  eventDate.getFullYear() === selectedDate.getFullYear() &&
                  eventDate.getMonth() === selectedDate.getMonth() &&
                  eventDate.getDate() === selectedDate.getDate()
                );
              })
              .map((event, index) => (
                <li key={index} className="mb-2">
                  <strong>{event.title}</strong><br />
                  {event.start.toLocaleTimeString()} – {event.end.toLocaleTimeString()}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
