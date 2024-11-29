from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # To allow cross-origin requests from React

# SQLite database file path
DB_FILE = "C:\Users\HP\Desktop\Contact Project\contacts.db"  # Replace with the path to your .db file

def get_db_connection():
    """Create a connection to the SQLite database."""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row  # Enable dictionary-like row access
    return conn

@app.route("/contacts", methods=["GET"])
def get_contacts():
    """Fetch all contacts from the database."""
    conn = get_db_connection()
    contacts = conn.execute("SELECT * FROM contacts").fetchall()
    conn.close()
    return jsonify([dict(contact) for contact in contacts])

@app.route("/contacts/<int:contact_id>", methods=["GET"])
def get_contact_details(contact_id):
    """Fetch contact details by ID."""
    conn = get_db_connection()
    contact = conn.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,)).fetchone()
    conn.close()
    if contact is None:
        return jsonify({"error": "Contact not found"}), 404
    return jsonify(dict(contact))

@app.route("/contacts", methods=["POST"])
def add_contact():
    """Add a new contact to the database."""
    new_contact = request.get_json()
    name = new_contact.get('name')
    phone = new_contact.get('phone')
    email = new_contact.get('email', '')

    conn = get_db_connection()
    conn.execute("INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)",
                 (name, phone, email))
    conn.commit()
    conn.close()
    return jsonify(new_contact), 201

@app.route("/contacts/<int:contact_id>", methods=["DELETE"])
def delete_contact(contact_id):
    """Delete a contact by ID."""
    conn = get_db_connection()
    conn.execute("DELETE FROM contacts WHERE id = ?", (contact_id,))
    conn.commit()
    conn.close()
    return '', 204  # No content, as the contact is deleted

if __name__ == "__main__":
    app.run(debug=True)
