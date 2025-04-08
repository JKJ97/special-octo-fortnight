import React from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

export default function MainLayout({ children, onNavChange }) {
  return (
    <Container fluid className="p-0">
      {/* Yläpalkki */}
      <Navbar bg="light" expand="lg" className="px-4 shadow">
        <Navbar.Brand>SimpleCal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <span className="me-3">Tervetuloa, Käyttäjä</span>
          <img
            src="https://via.placeholder.com/32"
            alt="User avatar"
            className="rounded-circle border"
          />
        </Navbar.Collapse>
      </Navbar>

      <Row noGutters>
        {/* Sivupalkki */}
        <Col xs={12} md={2} className="bg-dark text-white vh-100 p-3">
          <h4>Valikko</h4>
          <Nav className="flex-column">
            <Nav.Link className="text-white" onClick={() => onNavChange('calendar')}>📅 Kalenteri</Nav.Link>
            <Nav.Link className="text-white" onClick={() => onNavChange('list')}>📋 Tapahtumalista</Nav.Link>
            <Nav.Link className="text-white" onClick={() => onNavChange('add')}>➕ Lisää tapahtuma</Nav.Link>
          </Nav>
        </Col>

        {/* Pääsisältö */}
        <Col xs={12} md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
}