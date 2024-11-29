import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import './ThreeDotsMenu.css'; // Importing the updated CSS

const ThreeDotsMenu = ({ onAddContact, contacts }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null); // Reference for the menu
  const dotsRef = useRef(null); // Reference for the dots

  // Toggle menu visibility
  const toggleMenu = () => setShowMenu(!showMenu);

  // Close the menu if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !dotsRef.current.contains(event.target)) {
        setShowMenu(false); // Close the menu
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // Listen for outside clicks
    return () => document.removeEventListener('mousedown', handleClickOutside); // Clean up
  }, []);

  // Function to handle downloading contacts as Excel
  const handleDownloadContacts = () => {
    const contactData = contacts.map(contact => ({
      Name: contact.name,
      Phone: contact.phone,
      Email: contact.email
    }));

    // Create a new workbook and add the contacts data as a sheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(contactData);
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts');

    // Export the workbook as an Excel file
    XLSX.writeFile(wb, 'contacts.xlsx');
  };

  return (
    <div className="three-dots-menu" ref={dotsRef} onClick={toggleMenu}>
      <div className="dots"></div>  {/* Dot 1 */}
      <div className="dots"></div>  {/* Dot 2 */}
      <div className="dots"></div>  {/* Dot 3 */}
      
      {showMenu && (
        <div className="menu-options" ref={menuRef}>
          <button onClick={onAddContact}>Add Contact</button>
          <button onClick={handleDownloadContacts}>Download Contacts as Excel</button>
        </div>
      )}
    </div>
  );
};

export default ThreeDotsMenu;
