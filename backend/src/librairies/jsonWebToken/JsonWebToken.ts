import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import IJsonWebToken from '../../ports/librairies/jsonWebToken/IJsonWebToken';

config();

export class JsonWebToken implements IJsonWebToken {
  signToken(id: number, expirationDate: number): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables.');
    }
    return jwt.sign({ userId: id, exp: expirationDate }, process.env.JWT_SECRET)
  }
}
