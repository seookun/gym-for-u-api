import * as jwt from 'jsonwebtoken';
import { HttpError } from 'routing-controllers';
import Locals from '@/providers/Locals';
import { UserRole } from '@/models/UserModel';

type Payload = {
  userId: string;
};

export type RefreshTokenPayload = Payload;

export type AccessTokenPayload = {
  roles: UserRole[];
} & Payload;

function sign(payload: Payload, secretKey: string, expiresIn: string | number) {
  return jwt.sign(payload, secretKey, { expiresIn });
}

function verify(token: string, secretKey: string) {
  try {
    return <Payload>jwt.verify(token, secretKey);
  } catch {
    throw new HttpError(401, '유효하지 않은 토큰입니다.');
  }
}

export function createRefreshToken(payload: RefreshTokenPayload) {
  return sign(payload, Locals.refreshTokenSecretKey, Locals.refreshTokenExpiresIn);
}

export function verifyRefreshToken(token: string) {
  return <RefreshTokenPayload>verify(token, Locals.refreshTokenSecretKey);
}

export function createAccessToken(payload: AccessTokenPayload) {
  return sign(payload, Locals.accessTokenSecretKey, Locals.accessTokenExpiresIn);
}

export function verifyAccessToken(token: string) {
  return <AccessTokenPayload>verify(token, Locals.accessTokenSecretKey);
}

export default {
  createRefreshToken,
  verifyRefreshToken,
  createAccessToken,
  verifyAccessToken,
};
