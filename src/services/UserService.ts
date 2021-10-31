import * as moemnt from 'moment';
import { HttpError } from 'routing-controllers';
import { isMongoId } from 'class-validator';
import { FilterQuery } from 'mongoose';
import { hash } from '@/utils/crypto';
import UserModel, { User } from '@/models/UserModel';
import { CreateUserRequest } from '@/dtos/UserDto';

export default class UserService {
  async findUsers(query: FilterQuery<User>) {
    return (await UserModel.find(query)).flatMap((doc) => doc.toJSON());
  }

  async findUserById(_id: string) {
    if (!isMongoId(_id)) {
      throw new HttpError(400, `${_id}는 잘못된 ObjectId 입니다. `);
    }

    return await this.findUser({ _id });
  }

  async createUser(req: CreateUserRequest) {
    if (await UserModel.exists({ email: req.email })) {
      throw new HttpError(409, '이미 존재하는 이메일 입니다.');
    }

    if (await UserModel.exists({ name: req.name })) {
      throw new HttpError(409, '이미 존재하는 이름 입니다.');
    }

    if (await UserModel.exists({ phoneNumber: req.phoneNumber })) {
      throw new HttpError(409, '이미 존재하는 휴대폰번호 입니다.');
    }

    const user = {
      ...req,
      password: hash(req.password),
      passwordExpiresIn: moemnt().add(6, 'months').valueOf(),
    };

    await new UserModel(user).save();
  }

  private async findUser(query: FilterQuery<User>) {
    const user = (await UserModel.findOne(query))?.toJSON();

    if (!user) {
      throw new HttpError(404, '요청하신 정보를 찾을 수 없습니다.');
    }

    return user;
  }
}
