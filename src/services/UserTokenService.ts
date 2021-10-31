import { HttpError } from 'routing-controllers';
import UserTokenModel from '@/models/UserTokenModel';

export default class UserTokenService {
  async createUserToken(userId: string, refreshToken: string) {
    await new UserTokenModel({ userId, refreshToken }).save();
  }

  async deleteUserToken(userId: string, refreshToken: string) {
    const userToken = await UserTokenModel.findOne({ userId, refreshToken });

    if (!userToken) {
      throw new HttpError(404, '요청하신 정보를 찾을 수 없습니다.');
    }

    await userToken.remove();
  }
}
