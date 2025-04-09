import React from 'react';
import { Modal } from 'react-bootstrap';
import AddEventForm from './AddEventForm';

// Modal component for displaying the "Add Event" form in a popup window
export default function AddEventModal({ show, onHide, onEventAdded, defaultDate }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Lisää uusi tapahtuma</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddEventForm
          defaultDate={defaultDate} 
          onEventAdded={() => {
            onEventAdded();
            onHide();
          }}
        />
      </Modal.Body>
    </Modal>
  );
}
