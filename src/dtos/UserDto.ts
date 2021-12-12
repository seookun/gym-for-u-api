import { UserRole } from '@/models/UserModel';
import { IsEmail, IsString, IsPhoneNumber, IsOptional, MinLength, IsDate, IsArray } from 'class-validator';

export class FetchUserResponse {
  @IsString()
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

  @IsArray()
  @IsString()
  roles!: UserRole[];

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
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
