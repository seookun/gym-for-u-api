import { JsonController, Authorized, Get, Post, Body, Param, OnUndefined, CurrentUser } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { CreateUserRequest, FetchUserResponse } from '@/dtos/UserDto';
import UserService from '@/services/UserService';

@JsonController('/users')
export default class UserController {
  private userService = new UserService();

  @Authorized()
  @Get('/:userId')
  @ResponseSchema(FetchUserResponse)
  async fetchUser(@Param('userId') userId: string) {
    return await this.userService.findUserById(userId);
  }

  @Authorized()
  @Get('/session')
  @ResponseSchema(FetchUserResponse)
  async fetchSessionUser(@CurrentUser() userId: string) {
    return await this.userService.findUserById(userId);
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
