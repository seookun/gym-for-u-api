import { IsEmail, MinLength, IsOptional, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  public email!: string;

  @MinLength(6)
  public password!: string;

  @MinLength(2)
  public name!: string;

  @IsOptional()
  @IsString()
  public picto?: string;
}
