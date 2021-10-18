import { Schema, model } from 'mongoose';

export interface User {
  email: string;
  password: string;
  name: string;
  picto?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    picto: { type: String },
  },
  {
    timestamps: true,
  },
);

export default model<User>('User', userSchema);
