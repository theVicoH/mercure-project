import { Message } from '../entities/MessageEntities';
import { IMessageController } from '../types/IControllers';
import { IMessageUseCase, IMessageWithUsername } from '../types/IUseCases';
import { ResponseController } from '../types/Response';

export class MessageController implements IMessageController {
  constructor(private messageUseCase: IMessageUseCase) {}

  public async sendMessage(
    conversationId: number,
    senderId: number,
    message: string
  ): Promise<ResponseController<IMessageWithUsername>> {
    try {
      const messageData = await this.messageUseCase.createMessage(
        conversationId,
        senderId,
        message
      );
      return {
        code: 201,
        body: { message: 'Message successfully send', data: messageData },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: 500, body: { message: error.message } };
      } else {
        return { code: 500, body: { message: 'An unknown error occurred' } };
      }
    }
  }

  public async messageFeed(
    conversationId: number,
    userId: number
  ): Promise<ResponseController<Message[]>> {
    try {
      const allMessages = await this.messageUseCase.messageFeed(conversationId, userId);

      if (allMessages) {
        return {
          code: 200,
          body: {
            message: 'All Messages retrieved successfully',
            data: allMessages,
          },
        };
      } else {
        return { code: 404, body: { message: 'Message not found' } };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { code: 500, body: { message: error.message } };
      } else {
        return { code: 500, body: { message: 'An unknown error occurred' } };
      }
    }
  }
}
