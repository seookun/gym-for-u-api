import { Document, Schema, model } from 'mongoose';

export enum UserRole {
  Admin = 'Administrator',
  User = 'User',
}

export interface User extends Document {
  email: string;
  password?: string;
  passwordExpiresIn: Date;
  name: string;
  phoneNumber: string;
  picto?: string;
  roles: UserRole[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserToJson extends User {
  _id: string;
  password: undefined;
}

export const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    passwordExpiresIn: { type: Date },
    name: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    picto: { type: String },
    roles: { type: [String], default: [UserRole.User] },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret._id = ret._id.toString();
        delete ret.password;
        return ret;
      },
    },
  },
);

export default model<User>('User', userSchema);
