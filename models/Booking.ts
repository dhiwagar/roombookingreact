import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  specialRequest?: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema({
  bookingId: {
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
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  roomId: {
    type: String,
    required: true,
    ref: 'Room'
  },
  checkInDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (date: Date) {
        return date >= new Date();
      },
      message: 'Check-in date must be in the future'
    }
  },
  checkOutDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (this: IBooking, date: Date) {
        return date > this.checkInDate;
      },
      message: 'Check-out date must be after check-in date'
    }
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  specialRequest: {
    type: String,
    trim: true,
    maxlength: 500
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries (removed duplicate bookingId and roomId indexes)
BookingSchema.index({ email: 1 });
BookingSchema.index({ checkInDate: 1, checkOutDate: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ createdAt: -1 });

// Compound index for availability checks
BookingSchema.index({
  roomId: 1,
  checkInDate: 1,
  checkOutDate: 1,
  status: 1
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);