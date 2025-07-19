import mongoose, { Schema, Document } from 'mongoose';

export interface IMenu extends Document {
  menuId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  image: string;
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  allergens: string[];
  preparationTime: number;
  calories?: number;
  ingredients: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MenuSchema: Schema = new Schema({
  menuId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['appetizers', 'main-course', 'desserts', 'beverages', 'breakfast', 'lunch', 'dinner']
  },
  subcategory: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isSpicy: {
    type: Boolean,
    default: false
  },
  allergens: [{
    type: String,
    enum: ['dairy', 'nuts', 'gluten', 'eggs', 'shellfish', 'soy', 'fish', 'wheat']
  }],
  preparationTime: {
    type: Number,
    required: true,
    min: 0,
    max: 120
  },
  calories: {
    type: Number,
    min: 0
  },
  ingredients: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for efficient queries (removed duplicate menuId index)
MenuSchema.index({ category: 1 });
MenuSchema.index({ isAvailable: 1 });
MenuSchema.index({ isVegetarian: 1 });

export default mongoose.models.Menu || mongoose.model<IMenu>('Menu', MenuSchema); 