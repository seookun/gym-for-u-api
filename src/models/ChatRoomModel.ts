import { Document, Schema, model } from 'mongoose';

export enum ChatRoomType {
  Community = 'Community',
  Group = 'Group',
  Individual = 'Individual',
}

export interface ChatRoom extends Document {
  type: ChatRoomType;
  masterId?: string;
  name: string;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRoomToJson extends ChatRoom {
  _id: string;
}

export const chatRoomSchema = new Schema<ChatRoom>(
  {
    type: { type: String, required: true, index: true },
    masterId: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    lastMessageAt: { type: Date },
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

export default model<ChatRoom>('ChatRoom', chatRoomSchema);
