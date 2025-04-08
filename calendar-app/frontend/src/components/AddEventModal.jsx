import React from 'react';
import { Modal } from 'react-bootstrap';
import AddEventForm from './AddEventForm';

export default function AddEventModal({ show, onHide, onEventAdded }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Lisää uusi tapahtuma</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddEventForm
          onEventAdded={() => {
            onEventAdded();
            onHide();
          }}
        />
      </Modal.Body>
    </Modal>
  );
}
