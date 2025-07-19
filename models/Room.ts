import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  roomId: string;
  name: string;
  type: string;
  price: number;
  maxGuests: number;
  size: string;
  amenities: string[];
  images: string[];
  description: string;
  features: string[];
  isAvailable: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['deluxe', 'suite', 'premium', 'standard']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  maxGuests: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  size: {
    type: String,
    required: true
  },
  amenities: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    required: true,
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5
  }
}, {
  timestamps: true
});

// Index for efficient queries
RoomSchema.index({ type: 1 });
RoomSchema.index({ price: 1 });
RoomSchema.index({ isAvailable: 1 });

export default mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);