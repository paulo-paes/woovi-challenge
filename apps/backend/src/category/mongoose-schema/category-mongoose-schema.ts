import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true },
);

export const CategoryModel = mongoose.model('Category', categorySchema, 'categories');
