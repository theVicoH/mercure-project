import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { FastifyReply, FastifyRequest } from 'fastify';

config();

declare module 'fastify' {
  interface FastifyRequest {
    user?: { userId: number };
  }
}

const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Token not provided or malformed');
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not found');
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };
    request.user = decoded;
  } catch (err) {
    reply.code(401).send({ error: 'Authentication failed' });
  }
};

export default auth;
