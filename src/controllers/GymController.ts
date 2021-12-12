import { JsonController, Authorized, Get, Post, Param, Body, OnUndefined } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { CreateGymRequest, FetchGymResponse } from '@/dtos/GymDto';
import GymService from '@/services/GymService';

@JsonController('/gyms')
export default class GymController {
  private gymService = new GymService();

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
    await this.gymService.createGym(req);
  }
}
