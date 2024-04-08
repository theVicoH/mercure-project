import { FastifyInstance } from 'fastify';
import { UserController } from '../../../controllers/UserController';
import { UserUseCase } from '../../../userCases/UserUseCase';
import useCasesPack from '../../utils/UseCasesPack';
import { PublicRoutes } from '../../../types/Routes';

interface AuthRequestBody {
  username: string;
  password: string;
}

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase(useCasesPack);
  const userController = new UserController(userUseCase);

  fastify.post<{ Body: AuthRequestBody }>(
    PublicRoutes.Register,
    async (request, reply) => {
      const { username, password } = request.body;
      const result = await userController.register(username, password);
      reply.code(result.code).send(result.body);
    }
  );

  fastify.post<{ Body: AuthRequestBody }>(
    PublicRoutes.Login,
    async (request, reply) => {
      const { username, password } = request.body;
      const result = await userController.login(username, password);
      reply.code(result.code).send(result.body);
    }
  );
}
