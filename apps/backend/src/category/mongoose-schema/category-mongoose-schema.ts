import mongoose from 'mongoose';
import { Document } from '../../utils/mongoose-utils';

export interface CategoryDocument extends Document {
  name: string;
}

const categorySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true },
);

export const CategoryModel = mongoose.model(
  'Category',
  categorySchema,
  'categories',
);
