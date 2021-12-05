import { Document, Schema, model } from 'mongoose';

interface Address {
  zipno: string;
  main: string;
  detail?: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

export interface Gym extends Document {
  name: string;
  description?: string;
  thumbnail?: string;
  homepage?: string;
  address?: Address;
  location?: Location;
  createdAt: Date;
  updatedAt: Date;
}

export interface GymToJson extends Gym {
  _id: string;
}

export const gymSchema = new Schema<Gym>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    thumbnail: { type: String },
    homepage: { type: String },
    address: new Schema<Address>(
      {
        zipno: { type: String, required: true },
        main: { type: String, required: true },
        detail: { type: String },
      },
      { _id: false },
    ),
    location: new Schema<Location>(
      {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
      { _id: false },
    ),
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret._id = ret._id.toString();
        return ret;
      },
    },
  },
);

export default model<Gym>('Gym', gymSchema);
