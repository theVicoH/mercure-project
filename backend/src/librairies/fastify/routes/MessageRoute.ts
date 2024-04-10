import { FastifyInstance } from 'fastify';
import auth from '../middlewares/Auth';
import { PrivateRoutes } from '../../../types/Routes';
import { MessageUseCase } from '../../../userCases/MessageUseCase';
import { MessageController } from '../../../controllers/MessageController';
import useCasesPack from '../../utils/UseCasesPack';


interface MessageRequestBody {
  conversationId: number;
  message: string;
}

export async function messageRoutes(fastify: FastifyInstance) {
  const messageUseCase = new MessageUseCase(useCasesPack);
  const messageController = new MessageController(messageUseCase);
  
  fastify.post<{ Body: MessageRequestBody }>(
    PrivateRoutes.SendMessage,
    { preHandler: auth },
    async (request, reply) => {
      const { conversationId, message } = request.body;
      if (!request.user) {
        return reply
          .code(401)
          .send({ error: 'Unauthorized: User is missing from the request' });
      }
      const result = await messageController.sendMessage(
        conversationId,
        request.user.userId,
        message
      );
      reply.code(result.code).send(result.body);
    }
  );
}
