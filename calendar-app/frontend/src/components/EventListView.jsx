import React from "react";
import { Card, ListGroup, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function EventListView({ events, onEventDeleted, onEventEdit }) {
  const handleDelete = (id) => {
    if (window.confirm("Haluatko varmasti poistaa tapahtuman?")) {
      axios
        .delete(`http://localhost:3001/api/events/${id}`)
        .then(() => onEventDeleted())
        .catch((err) => console.error("Poistovirhe:", err));
    }
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );

  return (
    <Row className="mt-5">
      {/* Vasen tyhjä tila */}
      <Col md={1} lg={2} />

      {/* Itse kortti vasemmalla, mutta ei ihan reunassa */}
      <Col md={10} lg={8}>
        <Card>
          <Card.Body>
            <h4 className="text-center mb-4">Tapahtumalista</h4>
            {sortedEvents.length === 0 ? (
              <p className="text-center">Ei tapahtumia</p>
            ) : (
              <ListGroup variant="flush">
                {sortedEvents.map((event) => (
                  <ListGroup.Item key={event.id}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5>{event.title}</h5>
                        <p className="mb-1">{event.description}</p>
                        <small>{event.location}</small>
                        <br />
                        <small>
                          {new Date(event.start_time).toLocaleString("fi-FI", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          –{" "}
                          {new Date(event.end_time).toLocaleString("fi-FI", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </small>
                      </div>
                      <ButtonGroup>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => onEventEdit(event)}
                        >
                          Muokkaa
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(event.id)}
                        >
                          Poista
                        </Button>
                      </ButtonGroup>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      </Col>

      {/* Pienempi tyhjä tila oikealla, tai ei ollenkaan */}
      <Col md={1} />
    </Row>
  );
}
