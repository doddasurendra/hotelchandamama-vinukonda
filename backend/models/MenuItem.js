import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Tiffins', 'Meals', 'Snacks', 'Beverages', 'Desserts'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
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
    },
  },
  availability: {
    type: Boolean,
    default: true,
  },
  isVeg: {
    type: Boolean,
    default: true,
  },
  spiceLevel: {
    type: String,
    enum: ['None', 'Mild', 'Medium', 'Spicy', 'Extra Spicy'],
    default: 'None',
  },
  preparationTime: {
    type: Number,
    default: 15,
    min: 0,
  },
  tags: [String],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
menuItemSchema.index({ category: 1, availability: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
