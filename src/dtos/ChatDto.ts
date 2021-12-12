import { IsMongoId, IsString, IsDate } from 'class-validator';
import { ChatRoomType } from '@/models/ChatRoomModel';
import { ChatUserRole } from '@/models/ChatUserModel';

export class FetchChatRoomResponse {
  @IsString()
  _id!: string;

  @IsString()
  masterId!: string;

  @IsString()
  type!: ChatRoomType;

  @IsString()
  name!: string;

  @IsDate()
  lastMessageAt!: Date;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}

export class FetchChatUserResponse {
  @IsString()
  _id!: string;

  @IsString()
  roomId!: string;

  @IsString()
  userId!: string;

  @IsString()
  role!: ChatUserRole;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}
