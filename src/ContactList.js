import React, { useState, useEffect, useRef } from 'react';
import './ContactList.css';

function ContactList({ contacts, handleLetterClick }) {
  const [selectedContact, setSelectedContact] = useState(null);
  const detailsRef = useRef(null);

  // Sort the contacts alphabetically by name (ascending order)
  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  // Determine the column position based on index
  const isFourthColumn = (index) => (index + 1) % 4 === 0;

  // Toggle the pop-up on click
  const handleContactClick = (contact) => {
    if (selectedContact?.id === contact.id) {
      setSelectedContact(null); // Close the pop-up if already open
    } else {
      setSelectedContact(contact);
    }
  };

  // Close the pop-up if clicking outside
  const handleClickOutside = (event) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target)) {
      setSelectedContact(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="contact-list">
      {sortedContacts.map((contact, index) => {
        const firstLetter = contact.name[0].toUpperCase(); // Get first letter of contact's name
        return (
          <div key={contact.id} className="contact-item">
            <div
              className="contact-card"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering global click
                handleContactClick(contact);
              }}
            >
              <div className="icon-circle">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <span className="contact-name">{contact.name}</span>
            </div>

            {/* Contact details pop-up */}
            {selectedContact?.id === contact.id && (
              <div
                className={`contact-details-popup ${
                  isFourthColumn(index) ? 'popup-left' : 'popup-right'
                }`}
                ref={detailsRef} // Attach reference to detect outside clicks
              >
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Phone:</strong> {contact.phone || 'Not provided'}</p>
                {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
              </div>
            )}

            {/* Assign ID based on first letter to enable scroll */}
            <div id={`contact-${firstLetter}`} />
          </div>
        );
      })}
    </div>
  );
}

export default ContactList;
