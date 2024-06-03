import mongoose from 'mongoose';
import { Document } from '../../utils/mongoose-utils';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<UserDocument>(
  'User',
  userSchema,
  'users',
);
