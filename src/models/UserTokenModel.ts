import { Document, Schema, model } from 'mongoose';

export interface UserToken extends Document {
  userId: string;
  refreshToken: string;
}

export interface UserTokenToJson extends UserToken {
  _id: string;
}

export const userTokenSchema = new Schema<UserToken>(
  {
    userId: { type: String, required: true },
    refreshToken: { type: String, required: true, unique: true, index: true },
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret._id = ret._id.toString();
        return ret;
      },
    },
  },
);

export default model<UserToken>('UserToken', userTokenSchema);
