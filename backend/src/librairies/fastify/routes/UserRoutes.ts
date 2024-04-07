import { FastifyInstance } from 'fastify';
import { UserController } from '../../../controllers/UserController';
import { UserUseCase } from '../../../userCases/UserUseCase';
import { PublicRoutes } from '../../../routes/routes';
import useCasesPack from '../../utils/UseCasesConstructor';

interface AuthRequestBody {
  username: string;
  password: string;
}

export async function userRoutes(fastify: FastifyInstance) {
  const useCasesConstructor = await useCasesPack();
  const userUseCase = new UserUseCase(useCasesConstructor);
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
