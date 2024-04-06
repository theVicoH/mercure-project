import { FastifyInstance } from 'fastify';
import { UserController } from '../../../adapters/controllers/UserController';
import { UserRepository } from '../../../adapters/repository/UserRepository';
import UserService from '../../db/services/UserService';
import { Password } from '../../bcrypt/Password';
import { AuthRoute } from '../../../routes/routes';
import { JsonWebToken } from '../../jsonWebToken/JsonWebToken';

interface AuthRequestBody {
  username: string;
  password: string;
}

export async function authRoutes(fastify: FastifyInstance) {
  const password = new Password();
  const jsonWebToken = new JsonWebToken();
  const userService = new UserService();
  const userRepository = new UserRepository(userService, password, jsonWebToken);
  const userController = new UserController(userRepository);

  fastify.post<{ Body: AuthRequestBody }>(
    AuthRoute.Register,
    async (request, reply) => {
      const { username, password } = request.body;
      const result = await userController.register(username, password);
      reply.code(result.code).send(result.body);
    }
  );

  fastify.post<{ Body: AuthRequestBody }>(
    AuthRoute.Login,
    async (request, reply) => {
      const { username, password } = request.body;
      const result = await userController.login(username, password);
      reply.code(result.code).send(result.body);
    }
  );
}
