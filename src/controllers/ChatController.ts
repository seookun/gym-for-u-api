import { JsonController, Authorized, Get, Post, Delete, Param, Body, OnUndefined, CurrentUser } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { FetchChatUserResponse } from '@/dtos/ChatDto';
import { ChatRoomType } from '@/models/ChatRoomModel';
import ChatRoomService from '@/services/ChatRoomService';
import ChatUserService from '@/services/ChatUserService';

@JsonController('/chat')
export default class ChatController {
  private chatRoomService = new ChatRoomService();
  private chatUserService = new ChatUserService();

  @Authorized()
  @Get('/community/:roomId/users')
  @ResponseSchema(FetchChatUserResponse, { isArray: true })
  async fetchCommunityUsers(@Param('roomId') roomId: string) {
    return await this.chatUserService.findChatUsers({ roomId, type: ChatRoomType.Community });
  }

  @Authorized()
  @Post('/community/:masterId/join')
  @OnUndefined(200)
  async joinCommunity(@Param('masterId') masterId: string, @CurrentUser() userId: string) {
    const { _id: roomId, type: roomType } = await this.chatRoomService.findChatRoomCommunity(masterId);
    await this.chatUserService.createChatUser(roomId, userId, roomType);
  }
}
