import mongoose, { Types } from 'mongoose';
import { Document } from '../../utils/mongoose-utils';
import { CategoryDocument } from '../../category/mongoose-schema/category-mongoose-schema';
import { UserDocument } from '../../user/mongoose-schema/user-mongoose-schema';

export interface TaskDocument extends Document {
  name: string;
  description: string;
  done: boolean;
  category: CategoryDocument;
  user: UserDocument;
}

const taskSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    done: {
      type: Boolean,
      default: false
    },
    category: {
      type: Types.ObjectId,
      ref: 'categories',
    },
    user: {
      type: Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
);

export const TaskModel = mongoose.model<TaskDocument>(
  'Task',
  taskSchema,
  'tasks',
);
