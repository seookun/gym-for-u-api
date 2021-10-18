import { JsonController, Get, Post, Body, HttpCode } from 'routing-controllers';

import UserService from '../services/UserService';
import { CreateUserRequest } from '../dtos/UserDto';

@JsonController('/users')
export default class UserController {
  private userService = new UserService();

  @Get()
  async fetchUsers() {
    return this.userService.findAllUsers();
  }

  @Post()
  async createUser(@Body() user: CreateUserRequest) {
    return this.userService.createUser(user);
  }
}
