import * as dotenv from 'dotenv';
import * as path from 'path';

const normalizedEnvPath = path.join(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: normalizedEnvPath });

export default class Locals {
  // App
  static readonly isProduction = process.env.NODE_ENV === 'production';
  static readonly port = process.env.PORT!;
  static readonly apiPrefix = process.env.API_PREFIX!;

  // Database
  static readonly mongoConnectionUri = process.env.MONGO_CONNECTION_URI!;

  // Token
  static readonly refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY!;
  static readonly refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN!;
  static readonly accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY!;
  static readonly accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN!;
}
