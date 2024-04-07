import { FastifyInstance } from 'fastify';
import { PrivateRoutes } from '../../../routes/routes';
import auth from '../middlewares/Auth';
import FriendService from '../../db/services/FriendService';
import { FriendUseCase } from '../../../userCases/FriendUseCase';
import { FriendController } from '../../../controllers/FriendController';
import UserService from '../../db/services/UserService';

interface FriendRequestBody {
  friendUsername: string;
}

export async function friendRoutes(fastify: FastifyInstance) {
  const friendService = new FriendService();
  const userService = new UserService();
  const friendUseCase = new FriendUseCase(friendService, userService);
  const friendController = new FriendController(friendUseCase);
  fastify.post<{ Body: FriendRequestBody }>(
    PrivateRoutes.AddFriend,
    { preHandler: auth },
    async (request, reply) => {
      const { friendUsername } = request.body;
      if (!request.user) {
        return reply
          .code(401)
          .send({ error: 'Unauthorized: User ID is missing from the request' });
      }
      const result = await friendController.addFriend(
        request.user.userId,
        friendUsername
      );
      reply.code(result.code).send(result.body);
    }
  );
}
