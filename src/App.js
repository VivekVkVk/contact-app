import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import AddContactModal from './AddContactModal';
import ThreeDotsMenu from './ThreeDotsMenu'; 
import AlphabetSidebar from './AlphabetSidebar'; // Import Alphabet Sidebar
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]); // Will store contacts from the backend
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddContactModal, setShowAddContactModal] = useState(false);

  // Fetch contacts when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/contacts') // Fetch contacts from Flask backend
      .then(response => {
        setContacts(response.data); // Set contacts state with the fetched data
      })
      .catch(error => {
        console.error('There was an error fetching the contacts!', error);
      });
  }, []);

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle adding a new contact
  const handleAddContact = (newContact) => {
    // Add contact to the frontend
    setContacts([
      ...contacts,
      { id: contacts.length ? Math.max(...contacts.map(contact => contact.id)) + 1 : 1, ...newContact }
    ]);

    // Post the new contact to the backend
    axios.post('http://localhost:5000/contacts', newContact)
      .then(() => {
        setShowAddContactModal(false); // Close the modal after adding
      })
      .catch(error => {
        console.error('There was an error adding the contact!', error);
      });
  };

  // Scroll to first contact starting with the clicked letter
  const handleLetterClick = (letter) => {
    const contactElement = document.querySelector(`#contact-${letter.toUpperCase()}`);
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-container">
      {/* Top Rectangle with different background */}
      <div className="top-rectangle">
        <div>
          <h1 className="title">DIRECTORY</h1>
          <p className="subtitle">Welcome to the Contact Section</p>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Three Dots Menu for Add and Download options */}
      <ThreeDotsMenu
        onAddContact={() => setShowAddContactModal(true)}
        contacts={filteredContacts} // Pass filtered contacts for export
      />

      {/* Alphabet Sidebar */}
      <AlphabetSidebar onLetterClick={handleLetterClick} />

      {/* Contact List */}
      <ContactList
        contacts={filteredContacts}
        handleLetterClick={handleLetterClick} // Pass handleLetterClick to the ContactList if needed
      />

      {/* Add Contact Modal */}
      <AddContactModal
        show={showAddContactModal}
        onClose={() => setShowAddContactModal(false)}
        onSubmit={handleAddContact}
      />
    </div>
  );
}

export default App;
