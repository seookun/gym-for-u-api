import { Document, Schema, model } from 'mongoose';

export interface User extends Document {
  email: string;
  password?: string;
  passwordExpiresIn: Date;
  name: string;
  phoneNumber: string;
  picto?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    passwordExpiresIn: { type: Date },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    picto: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret._id = ret._id.toString();
        delete ret.password;
        return ret;
      },
    },
  },
);

export default model<User>('User', userSchema);
