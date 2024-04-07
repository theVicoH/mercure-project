import { FastifyInstance } from 'fastify';
import { UserController } from '../../../controllers/UserController';
import { UserUseCase } from '../../../userCases/UserUseCase';
import UserService from '../../db/services/UserService';
import { Password } from '../../bcrypt/Password';
import { UserRoutes } from '../../../routes/routes';
import { JsonWebToken } from '../../jsonWebToken/JsonWebToken';

interface AuthRequestBody {
  username: string;
  password: string;
}

export async function userRoutes(fastify: FastifyInstance) {
  const password = new Password();
  const jsonWebToken = new JsonWebToken();
  const userService = new UserService();
  const userUseCase = new UserUseCase(userService, password, jsonWebToken);
  const userController = new UserController(userUseCase);

  fastify.post<{ Body: AuthRequestBody }>(
    UserRoutes.Register,
    async (request, reply) => {
      const { username, password } = request.body;
      const result = await userController.register(username, password);
      reply.code(result.code).send(result.body);
    }
  );

  fastify.post<{ Body: AuthRequestBody }>(
    UserRoutes.Login,
    async (request, reply) => {
      const { username, password } = request.body;
      const result = await userController.login(username, password);
      reply.code(result.code).send(result.body);
    }
  );
}
