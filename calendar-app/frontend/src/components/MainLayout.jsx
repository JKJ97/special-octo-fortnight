import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

export default function MainLayout({ children, onNavChange, onAddEventClick }) {
  return (
    <Container fluid className="p-0">
      {/* Yläpalkki koko sivulle */}
      <Row className="bg-light px-4 py-2 align-items-center border-bottom shadow">
        <Col className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0">calendar-app</h3>
          <div className="text-end">
            <p className="mb-0">WSD Projekti</p>
          </div>
        </Col>
      </Row>

      {/* Sivupalkki + sisältöalue */}
      <Row>
        {/* Vasen navigointi */}
        <Col md={2} className="bg-dark text-white vh-100 p-3 d-flex flex-column align-items-start">
          {/* Align Valikko header with the list below */}
          <h5 className="mb-4 ps-2"> 🍔 Valikko</h5>
          <ListGroup variant="flush">
            <ListGroup.Item
              action
              onClick={() => onNavChange('calendar')}
              className="bg-dark text-white border-0"
            >
              📅 Kalenteri
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => onNavChange('list')}
              className="bg-dark text-white border-0"
            >
              📁 Tapahtumalista
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={onAddEventClick}
              className="bg-dark text-white border-0"
            >
              ➕ Lisää tapahtuma
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Oikea sisältöalue */}
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
}