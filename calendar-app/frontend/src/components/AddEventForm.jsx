import React, { useState, useEffect } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import 'moment/locale/fi';
import { Row, Col, Form, Button } from 'react-bootstrap';

moment.locale('fi');

// Component for rendering the event creation form
export default function AddEventForm({ onEventAdded, defaultDate }) {
  // State variables for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment().add(1, 'hours'));

  // If a default start/end date is provided (e.g. from calendar click), use it to populate the form
  useEffect(() => {
    if (defaultDate?.start && defaultDate?.end) {
      setStart(moment(defaultDate.start));
      setEnd(moment(defaultDate.end));
    }
  }, [defaultDate]);

  // Submits the form to the backend API and triggers callback on success
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      description,
      location,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
    };

    fetch('http://localhost:3001/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    })
      .then(res => res.json())
      .then(() => onEventAdded()) // Callback to refresh event list or calendar
      .catch(err => console.error(err));
  };

  // Render the form with inputs for title, description, location, and datetime pickers
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Otsikko</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Kuvaus</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Sijainti</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Alkamisaika</Form.Label>
            <Datetime
              value={start}
              onChange={setStart}
              dateFormat="D.M.YYYY"
              timeFormat="HH:mm"
              locale="fi"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Päättymisaika</Form.Label>
            <Datetime
              value={end}
              onChange={setEnd}
              dateFormat="D.M.YYYY"
              timeFormat="HH:mm"
              locale="fi"
            />
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit" className="btn btn-primary">Tallenna</Button>
    </Form>
  );
}
