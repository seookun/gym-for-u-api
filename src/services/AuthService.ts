import { isEmail } from 'class-validator';
import { FilterQuery } from 'mongoose';
import { HttpError } from 'routing-controllers';
import { hash } from '@/utils/crypto';
import UserModel, { User, UserToJson } from '@/models/UserModel';
import { LoginBasicRequest } from '@/dtos/AuthDto';

export default class AuthService {
  async findUserByBasic(req: LoginBasicRequest) {
    const query: FilterQuery<User> = { password: hash(req.password) };

    if (isEmail(req.emailOrName)) {
      query.email = req.emailOrName;
    } else {
      query.name = req.emailOrName;
    }

    const user = (await UserModel.findOne(query))?.toJSON<UserToJson>();

    if (!user) {
      throw new HttpError(401, 'The ID is not registered or the ID or password is entered incorrectly.');
    }

    return user;
  }
}
