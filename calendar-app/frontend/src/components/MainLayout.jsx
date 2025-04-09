import React from 'react';
import { Container } from 'react-bootstrap';
import SideBar from './SideBar';
import NavBar from './NavBar';

// Main layout component for the application
// Combines the top navigation bar, sidebar, and page content
export default function MainLayout({ children, onNavChange }) {
  return (
    <Container fluid className="p-0">
       {/* Top navigation bar */}
      <NavBar />
      
       {/* Leftside navigation menu */}
      <SideBar onNavChange={onNavChange} />

      {/* Main content area where views (calendar, list, etc.) are rendered */}
      <div style={{ marginLeft: '200px', padding: '80px 2rem 2rem 2rem' }}>
        {children}
      </div>
    </Container>
  );
}