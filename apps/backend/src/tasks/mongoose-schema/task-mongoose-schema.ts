import mongoose from 'mongoose';
import { Document } from '../../utils/mongoose-utils';

export interface TaskDocument extends Document {
  name: string;
  description: string;
}

const taskSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
  },
  { timestamps: true },
);

export const TaskModel = mongoose.model<TaskDocument>(
  'Task',
  taskSchema,
  'tasks',
);
