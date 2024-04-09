import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { IJsonWebToken } from '../../types/IJsonWebToken';

config();

export class JsonWebToken implements IJsonWebToken {
  signToken(payload: object, secret: string, expiresIn: number): string {
    const options = expiresIn ? { expiresIn } : undefined;
    return jwt.sign(payload, secret, options);
  }
}
