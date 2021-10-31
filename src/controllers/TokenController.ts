import { JsonController, Get, Param } from 'routing-controllers';
import jwt from '@/utils/jwt';
import UserService from '@/services/UserService';

@JsonController('/tokens')
export default class TokenController {
  private userSerivce = new UserService();

  @Get('/access/:refreshToken')
  async issueAccessToken(@Param('refreshToken') refreshToken: string) {
    const { userId } = jwt.verifyRefreshToken(refreshToken);
    const { roles } = await this.userSerivce.findUserById(userId);

    return jwt.createAccessToken({ userId, roles });
  }
}
