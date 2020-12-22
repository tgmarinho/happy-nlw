import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}


interface RequestCustom extends Request {
  user: { id: string }
}

export default function ensureAuthenticated(
  request: RequestCustom,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JTW  is missing', 401);
  }

  const [, ] = authHeader.split(' ');
  try {
    const decoded = verify("", authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    // TODO erro de TS, mas estou add no request um obj user....
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JTW ', 401);
  }
}
