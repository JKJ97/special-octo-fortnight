import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tapahtumat</h1>
      {events.length === 0 ? (
        <p>Ei tapahtumia</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.title}</strong> <br />
              {event.description} <br />
              {event.location} <br />
              {event.start_time} – {event.end_time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;