import { FastifyInstance } from 'fastify';
import auth from '../middlewares/Auth';
import { FriendUseCase } from '../../../userCases/FriendUseCase';
import { FriendController } from '../../../controllers/FriendController';
import useCasesPack from '../../utils/UseCasesPack';
import { PrivateRoutes } from '../../../types/Routes';

interface FriendRequestBody {
  friendUsername: string;
}

export async function friendRoutes(fastify: FastifyInstance) {
  const friendUseCase = new FriendUseCase(useCasesPack);
  const friendController = new FriendController(friendUseCase);
  fastify.post<{ Body: FriendRequestBody }>(
    PrivateRoutes.AddFriend,
    { preHandler: auth },
    async (request, reply) => {
      const { friendUsername } = request.body;
      if (!request.user) {
        return reply
          .code(401)
          .send({ error: 'Unauthorized: User is missing from the request' });
      }
      const result = await friendController.addFriend(
        request.user.userId,
        friendUsername
      );
      reply.code(result.code).send(result);
    }
  );

  fastify.get(
    PrivateRoutes.FriendsInfo, { preHandler: auth },
    async (request, reply) => {
      if (!request.user) {
        return reply
          .code(401)
          .send({ error: 'Unauthorized: User ID is missing from the request' });
      }
      const userId = request.user.userId;
      const result = await friendController.getAllFriends(userId);
      reply.code(result.code).send(result);
    }
  );
}
