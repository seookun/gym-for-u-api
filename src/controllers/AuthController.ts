import { JsonController, Post, Body, Param, OnUndefined } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import jwt from '@/utils/jwt';
import { LoginBasicRequest, LoginResponse } from '@/dtos/AuthDto';
import AuthService from '@/services/AuthService';
import UserTokenService from '@/services/UserTokenService';

@JsonController()
export default class LoginController {
  private authService = new AuthService();
  private userTokenServcie = new UserTokenService();

  @Post('/login')
  @ResponseSchema(LoginResponse)
  async doLoginBasic(@Body() req: LoginBasicRequest) {
    const { _id: userId, roles } = await this.authService.findUserByBasic(req);

    const refreshToken = jwt.createRefreshToken({ userId });
    const accessToken = jwt.createAccessToken({ userId, roles });

    await this.userTokenServcie.createUserToken(userId, refreshToken);

    return { refreshToken, accessToken };
  }

  @Post('/logout/:refreshToken')
  @OnUndefined(200)
  async doLogout(@Param('refreshToken') refreshToken: string) {
    const { userId } = jwt.verifyRefreshToken(refreshToken);
    await this.userTokenServcie.deleteUserToken(userId, refreshToken);
  }
}
