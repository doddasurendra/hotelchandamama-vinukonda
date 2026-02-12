import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    enum: ['interior', 'exterior', 'food', 'events', 'staff', 'other'],
    default: 'other',
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Index for sorting
gallerySchema.index({ displayOrder: 1, createdAt: -1 });

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
