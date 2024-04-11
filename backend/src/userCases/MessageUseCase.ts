import { Message } from '../entities/MessageEntities';
import {
  IMessageUseCase,
  IMessageWithUsername,
  IUseCasesConstructor,
} from '../types/IUseCases';

export class MessageUseCase implements IMessageUseCase {
  constructor(private services: IUseCasesConstructor) {}
  public async createMessage(
    conversationId: number,
    senderId: number,
    message: string
  ): Promise<IMessageWithUsername> {
    await this.services.conversationService.findConversation(conversationId);
    const createdMessage = await this.services.messageService.createMessage(
      conversationId,
      senderId,
      message
    );
    const senderPseudo = await this.services.userService.findUserById(senderId);
    if (!senderPseudo.username) {
      throw new Error("Can't find sender username");
    }
    if (!process.env.MERCURE_JWT) {
      throw new Error(
        'MERCURE_JWT is not defined in the environment variables'
      );
    }

    await this.services.sse.publish<IMessageWithUsername>(
      `/conversations/${conversationId}`,
      {
        id: createdMessage.id,
        conversationId: createdMessage.conversationId,
        senderId: createdMessage.senderId,
        username: senderPseudo.username,
        message: createdMessage.message,
        read: createdMessage.read,
        createdAt: createdMessage.createdAt,
      },
      process.env.MERCURE_JWT
    );

    const messageWithUsername = {
      ...createdMessage,
      username: senderPseudo.username,
    };

    return messageWithUsername;
  }

  public async messageFeed(conversationId: number): Promise<Message[]> {
    const conversation =
      await this.services.conversationService.findConversation(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    const messages =
      await this.services.messageService.findAllMessage(conversationId);
    return messages;
  }
}
