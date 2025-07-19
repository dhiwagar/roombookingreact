import mongoose, { Schema, Document } from 'mongoose';

export interface ITable extends Document {
  tableId: string;
  name: string;
  capacity: number;
  location: string;
  isAvailable: boolean;
  price: number;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TableSchema: Schema = new Schema({
  tableId: {
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
  capacity: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  location: {
    type: String,
    required: true,
    enum: ['indoor', 'outdoor', 'private', 'bar']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  image: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries (removed duplicate tableId index)
TableSchema.index({ location: 1 });
TableSchema.index({ isAvailable: 1 });

export default mongoose.models.Table || mongoose.model<ITable>('Table', TableSchema); 