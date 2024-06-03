import mongoose from 'mongoose';

export interface Document extends mongoose.Document {
  createdAt: Date
  updatedAt: Date
}
