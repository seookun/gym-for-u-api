import { createHash } from 'crypto';

export function hash(text: string) {
  return createHash('sha512').update(text).digest('base64');
}

export default {
  hash,
};
