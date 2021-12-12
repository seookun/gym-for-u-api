import { Document, Schema, model } from 'mongoose';
import { ChatRoomType } from './ChatRoomModel';

export enum ChatUserRole {
  Manager = 'Manager',
  SecondaryManager = 'Secondary Manager',
  User = 'User',
}

export interface ChatUser extends Document {
  roomId: string;
  roomType: ChatRoomType;
  userId: string;
  role: ChatUserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatUserToJson extends ChatUser {
  _id: string;
}

export const chatUserSchema = new Schema<ChatUser>(
  {
    roomId: { type: String, required: true },
    userId: { type: String, required: true },
    roomType: { type: String, required: true },
    role: { type: String, default: ChatUserRole.User },
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
).index({ roomId: 1, userId: 1 }, { unique: true });

export default model<ChatUser>('ChatUser', chatUserSchema);
