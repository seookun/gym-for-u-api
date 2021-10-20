import { JsonController, Get, Post, Body, Param } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { CreateUserRequest, FetchUserResponse } from '@/dtos/UserDto';
import UserService from '@/services/UserService';

@JsonController('/users')
export default class UserController {
  private userService = new UserService();

  @Get()
  @ResponseSchema(FetchUserResponse, { isArray: true })
  async fetchUsers() {
    return await this.userService.findUsers({});
  }

  @Get('/:id')
  @ResponseSchema(FetchUserResponse)
  async fetchUser(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserRequest) {
    await this.userService.createUser(user);
  }
}
