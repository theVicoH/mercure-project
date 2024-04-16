import { Message } from '../entities/MessageEntities';
import {
  IMessageUseCase,
  IMessageWithUsername,
  INotifcation,
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
    const sender = await this.services.userService.findUserById(senderId);
    if (!sender.username) {
      throw new Error("Can't find sender username");
    }
    if (!process.env.MERCURE_JWT) {
      throw new Error(
        'MERCURE_JWT is not defined in the environment variables'
      );
    }

    const friend = await this.services.userService.findFriendInConversation(senderId, conversationId)
    if (!friend) {
      throw new Error(
        'Friend not found'
      );
    }

    await this.services.sse.publish<IMessageWithUsername>(
      `/conversations/${conversationId}`,
      {
        id: createdMessage.id,
        conversationId: createdMessage.conversationId,
        senderId: createdMessage.senderId,
        username: sender.username,
        message: createdMessage.message,
        read: createdMessage.read,
        createdAt: createdMessage.createdAt,
      },
      process.env.MERCURE_JWT
    );

    await this.services.sse.publish<INotifcation>(
      `/notification/${friend.id}`,
      {
        id: sender.id,
        conversationId: createdMessage.conversationId,
        username: sender.username,
        photo: sender.photo,
        message: createdMessage.message,
      },
      process.env.MERCURE_JWT
    );

    const messageWithUsername = {
      ...createdMessage,
      username: sender.username,
    };

    return messageWithUsername;
  }

  public async messageFeed(conversationId: number, userId: number): Promise<Message[]> {
    const conversation =
      await this.services.conversationService.findConversation(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    const isRead = await this.services.messageService.markMessagesAsRead(userId, conversationId)
    if(!isRead){
      throw new Error('Problem when setting messages as read');
    }
    const messages =
      await this.services.messageService.findAllMessage(conversationId);
    return messages;
  }
}
