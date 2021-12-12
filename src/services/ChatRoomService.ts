import { HttpError } from 'routing-controllers';
import { isMongoId } from 'class-validator';
import { FilterQuery } from 'mongoose';
import ChatRoomModel, { ChatRoom, ChatRoomType, ChatRoomToJson } from '@/models/ChatRoomModel';

export default class ChatRoomService {
  async findChatRoomCommunity(masterId: string) {
    if (!isMongoId(masterId)) {
      throw new HttpError(400, `${masterId}는 잘못된 ObjectId 입니다.`);
    }

    return await this.findChatRoom({ masterId, type: ChatRoomType.Community });
  }

  async createChatRoomCommunity(masterId: string, name: string) {
    const type = ChatRoomType.Community;

    if (await ChatRoomModel.exists({ masterId, type })) {
      throw new HttpError(409, '이미 존재하는 커뮤니티 입니다.');
    }

    return (await new ChatRoomModel({ masterId, type, name }).save()).toJSON<ChatRoomToJson>();
  }

  private async findChatRoom(query: FilterQuery<ChatRoom>) {
    const chatRoom = (await ChatRoomModel.findOne(query))?.toJSON<ChatRoomToJson>();

    if (!chatRoom) {
      throw new HttpError(404, '요청하신 정보를 찾을 수 없습니다.');
    }

    return chatRoom;
  }
}
