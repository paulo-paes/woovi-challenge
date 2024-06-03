import { randomBytes, timingSafeEqual, scrypt } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

export const hashPassword = async (password: string) => {
  const salt = randomBytes(60).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buf.toString('hex')}.${salt}`;
};

export const comparePassword = async (
  storedPass: string,
  candidate: string,
) => {
  const [hashedPassword, salt] = storedPass.split('.');

  const hashedPasswordBuf = Buffer.from(hashedPassword!, 'hex');
  const candidateBuf = (await scryptAsync(candidate, salt!, 64)) as Buffer;

  return timingSafeEqual(hashedPasswordBuf, candidateBuf);
};
