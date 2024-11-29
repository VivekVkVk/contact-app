from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # To allow cross-origin requests from React

# SQLite database file path
DB_FILE = r"C:\Users\HP\contact-list-app\contacts.db"  # Replace with the path to your .db file

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

    # Use correct field names from the database
    return jsonify([{
        "id": contact["id"],
        "name": contact["name"],
        "email": contact["email"] if contact["email"] else "No email provided",
        "phone": contact["phone"] if contact["phone"] else "No phone provided"
    } for contact in contacts])


@app.route("/contacts", methods=["POST"])
def add_contact():
    """Add a new contact to the database."""
    new_contact = request.get_json()

    # Extract contact details from the request
    name = new_contact.get("name")
    email = new_contact.get("email", None)
    phone = new_contact.get("phone")

    # Validate input data
    if not name or not phone:
        return jsonify({"error": "Name and phone number are required"}), 400

    conn = get_db_connection()
    conn.execute(
        "INSERT INTO contacts (name, 'E-mail 1 - Value', 'Phone 1 - Value') VALUES (?, ?, ?)",
        (name, email, phone)
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Contact added successfully"}), 201

@app.route("/contacts/<int:contact_id>", methods=["DELETE"])
def delete_contact(contact_id):
    """Delete a contact from the database."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,))
    contact = cursor.fetchone()

    if not contact:
        conn.close()
        return jsonify({"error": "Contact not found"}), 404

    cursor.execute("DELETE FROM contacts WHERE id = ?", (contact_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Contact deleted successfully"}), 200

@app.route("/contacts/<int:contact_id>", methods=["GET"])
def get_contact_details(contact_id):
    """Fetch contact details by ID."""
    conn = get_db_connection()
    contact = conn.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,)).fetchone()
    conn.close()
    if contact is None:
        return jsonify({"error": "Contact not found"}), 404
    return jsonify(dict(contact))

if __name__ == "__main__":
    app.run(debug=True)
