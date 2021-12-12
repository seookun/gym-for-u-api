import { JsonController, Authorized, Get, Post, Body, Param, OnUndefined } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { CreateUserRequest, FetchUserResponse } from '@/dtos/UserDto';
import UserService from '@/services/UserService';

@JsonController('/users')
export default class UserController {
  private userService = new UserService();

  @Authorized()
  @Get('/:_id')
  @ResponseSchema(FetchUserResponse)
  async fetchUser(@Param('_id') _id: string) {
    return await this.userService.findUserById(_id);
  }

  @Authorized()
  @Get()
  @ResponseSchema(FetchUserResponse, { isArray: true })
  async fetchUsers() {
    return await this.userService.findUsers({});
  }

  @Post()
  @OnUndefined(200)
  async createUser(@Body() req: CreateUserRequest) {
    await this.userService.createUser(req);
  }
}
