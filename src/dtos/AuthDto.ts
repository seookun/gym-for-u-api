import { IsString } from 'class-validator';

export class LoginBasicRequest {
  @IsString()
  emailOrName!: string;

  @IsString()
  password!: string;
}

export class LoginResponse {
  @IsString()
  refreshToken!: string;

  @IsString()
  accessToken!: string;
}
