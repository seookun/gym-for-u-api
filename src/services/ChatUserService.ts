import { HttpError } from 'routing-controllers';
import { isMongoId } from 'class-validator';
import { FilterQuery } from 'mongoose';
import ChatUserModel, { ChatUser, ChatUserRole, ChatUserToJson } from '@/models/ChatUserModel';
import { ChatRoomType } from '@/models/ChatRoomModel';

export default class ChatUserService {
  async findChatUsers(query: FilterQuery<ChatUser>) {
    return (await ChatUserModel.find(query)).flatMap((doc) => doc.toJSON<ChatUserToJson>());
  }

  async createChatUser(roomId: string, userId: string, roomType: ChatRoomType) {
    if (!isMongoId(roomId)) {
      throw new HttpError(400, `${roomId}는 잘못된 ObjectId 입니다.`);
    }

    if (!isMongoId(userId)) {
      throw new HttpError(400, `${userId}는 잘못된 ObjectId 입니다.`);
    }

    if (await ChatUserModel.exists({ roomId, userId })) {
      throw new HttpError(400, '이미 가입된 사용자 입니다.');
    }

    const chatUser = {
      roomId,
      userId,
      roomType,
      role: ChatUserRole.User,
    };

    return (await new ChatUserModel(chatUser).save()).toJSON<ChatUserToJson>();
  }
}
