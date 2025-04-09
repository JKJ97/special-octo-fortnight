import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "moment/locale/fi";

// Set moment locale to Finnish
moment.locale("fi");

// Modal component to edit or delete an existing event
export default function EditEventModal({
  show,
  onHide,
  event,
  onSave,
  onDelete,
}) {
  // State to hold editable form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_time: moment(),
    end_time: moment().add(1, "hours"),
  });

 // Populate form when the event prop is updated (e.g. user selects an event)
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        location: event.location || "",
        start_time: moment(event.start_time),
        end_time: moment(event.end_time),
      });
    }
  }, [event]);

  // Handle form field changes for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated event data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      ...formData,
      start_time: formData.start_time.toISOString(),
      end_time: formData.end_time.toISOString(),
    };

    axios
      .put(`http://localhost:3001/api/events/${event.id}`, updatedEvent)
      .then(() => {
        onSave(); // Notify parent component (e.g. to refresh events)
        onHide(); // Close the modal
      })
      .catch((err) => console.error("Päivitysvirhe:", err));
  };

  // Delete the event from the backend
  const handleDeleteEvent = () => {
    axios
      .delete(`http://localhost:3001/api/events/${event.id}`)
      .then(() => {
        if (onDelete) onDelete(); // Notify parent component and close modal
      })
      .catch((error) => {
        console.error("Virhe poistettaessa tapahtumaa:", error);
      });
  };

  // Render the modal with form inputs and action buttons
  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Muokkaa tapahtumaa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>

          {/* Title input */}
          <Form.Group className="mb-3">
            <Form.Label>Otsikko</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

           {/* Description input */}
          <Form.Group className="mb-3">
            <Form.Label>Kuvaus</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

           {/* Location input */}
          <Form.Group className="mb-3">
            <Form.Label>Sijainti</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

           {/* Start and End time inputs */}
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Alkamisaika</Form.Label>
                <Datetime
                  value={formData.start_time}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, start_time: val }))
                  }
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
                  value={formData.end_time}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, end_time: val }))
                  }
                  dateFormat="D.M.YYYY"
                  timeFormat="HH:mm"
                  locale="fi"
                />
              </Form.Group>
            </Col>
          </Row>

           {/* Action buttons */}
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Tallenna muutokset
            </Button>
            <Button variant="danger" onClick={handleDeleteEvent}>
              Poista tapahtuma
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
