const Contact = require('../models/Contact');

// @desc    Create contact/catering inquiry
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, phone, message, type } = req.body;

    // Validate input
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, phone, and message'
      });
    }

    const contact = await Contact.create({
      name,
      phone,
      message,
      type: type || 'contact'
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
      data: contact
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message'
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private (Admin)
const getContacts = async (req, res) => {
  try {
    const { type } = req.query;
    
    let query = {};
    if (type && ['contact', 'catering'].includes(type)) {
      query.type = type;
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact'
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContact
};
