import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  type: {
    type: String,
    enum: ['contact', 'catering'],
    default: 'contact',
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new',
  },
  // For catering enquiries
  eventDate: Date,
  guestCount: Number,
  eventType: String,
  requirements: String,
}, {
  timestamps: true,
});

// Index for queries
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ type: 1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
