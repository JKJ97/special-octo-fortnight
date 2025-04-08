import React from 'react';
import { Container } from 'react-bootstrap';
import SideBar from './SideBar';
import NavBar from './NavBar';

export default function MainLayout({ children, onNavChange }) {
  return (
    <Container fluid className="p-0">
      <NavBar />
      <SideBar onNavChange={onNavChange} />
      <div style={{ marginLeft: '200px', padding: '80px 2rem 2rem 2rem' }}>
        {/* marginTop vastaa navbarin korkeutta */}
        {children}
      </div>
    </Container>
  );
}