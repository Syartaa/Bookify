const Contact = require('../models/contactus');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a contact by ID
const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = await Contact.create({ name, email, message });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, subject, message } = req.body;
  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await contact.update({
      name: name || contact.name,
      email: email || contact.email,
      message: message || contact.message,
    });

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await contact.destroy();
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
