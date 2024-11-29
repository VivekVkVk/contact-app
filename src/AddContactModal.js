import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './AddContactModal.css';

const AddContactModal = ({ show, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (name && /^[0-9]{10}$/.test(phone)) {
      onSubmit({ name, phone, email });
      setName('');
      setPhone('');
      setEmail('');
      onClose();  // Close the modal after submit
    } else {
      alert('Please enter a valid name and 10-digit phone number.');
    }
  };

  return (
    <Modal show={show} onHide={onClose} className="modal-dialog">
        <Modal.Header>
        <Modal.Title>Add Contact</Modal.Title>
        <button
            type="button"
            className="custom-close-btn"
            onClick={onClose}
            aria-label="Close"
        >
            &times; {/* Unicode for "X" */}
        </button>
        </Modal.Header>
      <Modal.Body>
        <div className="contact-form-container">
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit phone number"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email (optional)</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email (optional)"
              />
            </Form.Group>
          </Form>
          <div className="button-container">
            <Button variant="primary" className="primary" onClick={handleSubmit}>
              Add Contact
            </Button>
            <Button variant="secondary" className="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddContactModal;
