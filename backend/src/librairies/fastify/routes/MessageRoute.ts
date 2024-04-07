import { FastifyInstance } from 'fastify';
import { PrivateRoutes } from '../../../types/Routes';
import auth from '../middlewares/Auth';

interface MessageRequestBody {
  conversationId: number;
  message: string;
}

export async function messageRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: MessageRequestBody }>(
    PrivateRoutes.SendMessage,
    { preHandler: auth },
    async (request, reply) => {
      const { conversationId, message } = request.body;
      if (!request.user) {
        return reply
          .code(401)
          .send({ error: 'Unauthorized: User ID is missing from the request' });
      }
      // const result = await friendController.addFriend(
      //   request.user.userId,
      //   friendUsername
      // );
      // reply.code(result.code).send(result.body);
    }
  );
}
