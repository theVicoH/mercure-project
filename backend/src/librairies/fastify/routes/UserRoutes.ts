import { FastifyInstance } from 'fastify';
import { UserController } from '../../../controllers/UserController';
import { UserUseCase } from '../../../userCases/UserUseCase';
import useCasesPack from '../../utils/UseCasesPack';
import { PrivateRoutes, PublicRoutes } from '../../../types/Routes';
import auth from '../middlewares/Auth';

interface AuthRegisterRequestBody {
  username: string;
  password: string;
  photo: string;
}
interface AuthLoginRequestBody {
  username: string;
  password: string;
}
interface UsersRouteParams {
  id: number;
}

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase(useCasesPack);
  const userController = new UserController(userUseCase);

  fastify.post<{ Body: AuthRegisterRequestBody }>(
    PublicRoutes.Register,
    async (request, reply) => {
      const { username, password, photo } = request.body;
      const result = await userController.register(
        username,
        password,
        photo
      );
      reply.code(result.code).send(result);
    }
  );

  fastify.post<{ Body: AuthLoginRequestBody }>(
    PublicRoutes.Login,
    async (request, reply) => {
      const { username, password } = request.body;
      const result = await userController.login(username, password);
      reply.code(result.code).send(result);
    }
  );

  fastify.get(
    PrivateRoutes.UserInfo,
    { preHandler: auth },
    async (request, reply) => {
      if (!request.user) {
        return reply
          .code(401)
          .send({ error: 'Unauthorized: User ID is missing from the request' });
      }
      const userId = request.user.userId;
      const result = await userController.getUserInfo(userId);
      reply.code(result.code).send(result);
    }
  );

  fastify.get<{ Params: UsersRouteParams }>(
    PrivateRoutes.UsersInConversation, { preHandler: auth },
    async (request, reply) => {
      const { id: conversationId } = request.params;
      if (!request.user) {
        return reply
          .code(401)
          .send({ error: 'Unauthorized: User ID is missing from the request' });
      }
      const result = await userController.getAllUsersInConversation(conversationId);
      reply.code(result.code).send(result.body);
    }
  );
}
