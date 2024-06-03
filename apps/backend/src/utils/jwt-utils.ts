import jwt, { JwtPayload } from 'jsonwebtoken';

export const sign = (userId: string): string => {
  return jwt.sign({}, process.env.JWT_KEY!, {
    expiresIn: '2h',
    subject: userId,
  });
};

export const verify = (token: string): false | JwtPayload => {
  const payload = jwt.verify(token, process.env.JWT_KEY!);
  if (!payload) return false;

  return payload as JwtPayload;
};

export const decode = (token: string) => {
  return jwt.decode(token);
};
