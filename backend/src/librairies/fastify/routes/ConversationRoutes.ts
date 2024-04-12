import { FastifyInstance } from 'fastify';
import auth from '../middlewares/Auth';
import useCasesPack from '../../utils/UseCasesPack';
import { PrivateRoutes } from '../../../types/Routes';
import { ConversationUseCase } from '../../../userCases/ConversationUseCase';
import { ConversationController } from '../../../controllers/ConversationController';

export async function conversationRoutes(fastify: FastifyInstance) {
  const conversationUseCase = new ConversationUseCase(useCasesPack);
  const conversationController = new ConversationController(
    conversationUseCase
  );
  fastify.get(
    PrivateRoutes.ConversationList,
    { preHandler: auth },
    async (request, reply) => {
      if (!request.user) {
        return reply
          .code(401)
          .send({ error: 'Unauthorized: User is missing from the request' });
      }
      console.log(true);
      const result = await conversationController.userConversationsList(
        request.user.userId
      );
      reply.code(result.code).send(result.body);
    }
  );
}
