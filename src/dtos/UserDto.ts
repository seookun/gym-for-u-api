import { IsMongoId, IsEmail, IsString, IsPhoneNumber, IsOptional, MinLength } from 'class-validator';

export class FetchUserResponse {
  @IsMongoId()
  _id!: string;

  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsPhoneNumber('KR')
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  picto?: string;
}

export class CreateUserRequest {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @MinLength(2)
  name!: string;

  @IsPhoneNumber('KR')
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  picto?: string;
}
