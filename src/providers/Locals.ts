import * as dotenv from 'dotenv';
import * as path from 'path';

const normalizedEnvPath = path.join(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: normalizedEnvPath });

export default class Locals {
  // App
  public static readonly isProduction = process.env.NODE_ENV === 'production';
  public static readonly port = process.env.PORT!;
  public static readonly apiPrefix = process.env.API_PREFIX!;

  // Database
  public static readonly mongoConnectionUri = process.env.MONGO_CONNECTION_URI!;

  // Token
  public static readonly tokenSecretKey = process.env.TOKEN_SECRET_KEY!;
  public static readonly tokenExpiresInHours = parseInt(process.env.TOKEN_EXPIRES_IN_HOURS!);
  public static readonly tokenExpiresInDays = parseInt(process.env.TOKEN_EXPIRES_IN_DAYS!);
}
