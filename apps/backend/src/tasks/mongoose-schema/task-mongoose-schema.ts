import mongoose from 'mongoose';

export interface TaskDocument extends mongoose.Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
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
