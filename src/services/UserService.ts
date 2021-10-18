import { HttpError } from 'routing-controllers';

import UserModel from '@/models/UserModel';
import { CreateUserRequest } from '@/dtos/UserDto';

export default class UserService {
  async findUserById(_id: string) {
    return await UserModel.find({ _id });
  }

  async findAllUsers() {
    return await UserModel.find({});
  }

  async createUser(req: CreateUserRequest) {
    if (await UserModel.exists({ email: req.email })) {
      throw new HttpError(409, 'An account with this email already exists.');
    }

    await new UserModel(req).save();
  }
}
