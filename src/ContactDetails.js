import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ContactDetails.css';

function ContactDetails({ contacts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = contacts.find((c) => c.id === parseInt(id));

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div className="contact-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>{contact.name}</h1>
      <p>📞 {contact.phone || 'No phone number provided'}</p>
      {contact.email && <p>✉️ {contact.email}</p>}
      <div className="call-log">
        <h2>Call Log</h2>
        <ul>
          <li>Call on 2024-11-28, Duration: 5 mins</li>
          <li>Call on 2024-11-25, Duration: 12 mins</li>
          <li>Call on 2024-11-20, Duration: 3 mins</li>
        </ul>
      </div>
    </div>
  );
}

export default ContactDetails;
