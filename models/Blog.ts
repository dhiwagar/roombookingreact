import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  blogId: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  isPublished: boolean;
  publishedAt?: Date;
  views: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  blogId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['news', 'events', 'promotions', 'lifestyle', 'food', 'travel']
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    required: true,
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries (removed duplicate blogId and slug indexes)
BlogSchema.index({ category: 1 });
BlogSchema.index({ isPublished: 1 });
BlogSchema.index({ publishedAt: -1 });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema); 