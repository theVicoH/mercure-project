import { FastifyInstance } from 'fastify';
import { PrivateRoutes } from '../../../types/Routes';
import auth from '../middlewares/Auth';
import { FriendUseCase } from '../../../userCases/FriendUseCase';
import { FriendController } from '../../../controllers/FriendController';
import useCasesPack from '../../utils/UseCasesPack';

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
