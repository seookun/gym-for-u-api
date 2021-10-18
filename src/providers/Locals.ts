import * as dotenv from 'dotenv';
import * as path from 'path';

const normalizedEnvPath = path.join(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`);
dotenv.config({ path: normalizedEnvPath });

export default class Locals {
  public static readonly isProduction = process.env.NODE_ENV === 'production';
}
