import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "moment/locale/fi";

moment.locale("fi");

export default function EditEventModal({
  show,
  onHide,
  event,
  onSave,
  onDelete,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_time: moment(),
    end_time: moment().add(1, "hours"),
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        onSave();
        onHide();
      })
      .catch((err) => console.error("Päivitysvirhe:", err));
  };

  const handleDeleteEvent = () => {
    axios
      .delete(`http://localhost:3001/api/events/${event.id}`)
      .then(() => {
        if (onDelete) onDelete();
      })
      .catch((error) => {
        console.error("Virhe poistettaessa tapahtumaa:", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Muokkaa tapahtumaa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
          <Form.Group className="mb-3">
            <Form.Label>Sijainti</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>
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
