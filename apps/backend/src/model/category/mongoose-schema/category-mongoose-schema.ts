import mongoose, { Types } from 'mongoose';
import { Document } from '../../../utils/mongoose-utils';
import { UserDocument } from '../../user/mongoose-schema/user-mongoose-schema';

export interface CategoryDocument extends Document {
  name: string;
  user: UserDocument;
}

const categorySchema = new mongoose.Schema(
  {
    name: String,
    user: {
      type: Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
);

export const CategoryModel = mongoose.model<CategoryDocument>(
  'Category',
  categorySchema,
  'categories',
);
