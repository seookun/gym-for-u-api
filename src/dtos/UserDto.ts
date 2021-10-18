import { IsEmail, MinLength, IsOptional, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @MinLength(2)
  name!: string;

  @IsOptional()
  @IsString()
  picto?: string;
}
