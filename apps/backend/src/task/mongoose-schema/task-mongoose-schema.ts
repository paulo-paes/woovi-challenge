import mongoose, { Types } from 'mongoose';
import { Document } from '../../utils/mongoose-utils';
import { CategoryDocument } from '../../category/mongoose-schema/category-mongoose-schema';

export interface TaskDocument extends Document {
  name: string;
  description: string;
  category: CategoryDocument
}

const taskSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    category: {
      type: Types.ObjectId,
      ref: 'categories'
    }
  },
  { timestamps: true },
);

export const TaskModel = mongoose.model<TaskDocument>(
  'Task',
  taskSchema,
  'tasks',
);
