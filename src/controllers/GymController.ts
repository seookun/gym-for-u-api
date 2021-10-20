import { JsonController, Get, Post, Param, Body } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { CreateGymRequest, FetchGymResponse } from '@/dtos/GymDto';
import GymService from '@/services/GymService';

@JsonController('/gyms')
export default class GymController {
  private gymService = new GymService();

  @Get()
  @ResponseSchema(FetchGymResponse, { isArray: true })
  async fetchGyms() {
    return await this.gymService.findGyms({});
  }

  @Get('/:id')
  @ResponseSchema(FetchGymResponse)
  async fetchGym(@Param('id') id: string) {
    return await this.gymService.findGymById(id);
  }

  @Post()
  async createGym(@Body() req: CreateGymRequest) {
    await this.gymService.createGym(req);
  }
}
