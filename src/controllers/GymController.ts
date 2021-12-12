import { JsonController, Authorized, Get, Post, Param, Body, OnUndefined } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { CreateGymRequest, FetchGymResponse } from '@/dtos/GymDto';
import GymService from '@/services/GymService';
import ChatRoomService from '@/services/ChatRoomService';

@JsonController('/gyms')
export default class GymController {
  private gymService = new GymService();
  private chatRoomService = new ChatRoomService();

  @Authorized()
  @Get()
  @ResponseSchema(FetchGymResponse, { isArray: true })
  async fetchGyms() {
    return await this.gymService.findGyms({});
  }

  @Authorized()
  @Get('/:_id')
  @ResponseSchema(FetchGymResponse)
  async fetchGym(@Param('_id') _id: string) {
    return await this.gymService.findGymById(_id);
  }

  @Authorized()
  @Post()
  @OnUndefined(200)
  async createGym(@Body() req: CreateGymRequest) {
    const { _id, name } = await this.gymService.createGym(req);
    await this.chatRoomService.createChatRoomCommunity(_id, name);
  }
}
