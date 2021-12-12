import { IsString, IsNumber, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Address {
  @IsString()
  zipno!: string;

  @IsString()
  main!: string;

  @IsOptional()
  @IsString()
  detail?: string;
}

class Location {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;
}

export class FetchGymResponse {
  @IsString()
  _id!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  homepage?: string;

  @ValidateNested()
  @Type(() => Address)
  address?: Address;

  @ValidateNested()
  @Type(() => Location)
  location?: Location;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}

export class CreateGymRequest {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  homepage?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Address)
  address?: Address;

  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  location?: Location;
}
