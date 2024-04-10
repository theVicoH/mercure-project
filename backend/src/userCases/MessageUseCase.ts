import { IMessageUseCase, IMessageWithUsername, IUseCasesConstructor } from '../types/IUseCases';

export class MessageUseCase implements IMessageUseCase {
  constructor(private services: IUseCasesConstructor) {}
  async createMessage(
    conversationId: number,
    senderId: number,
    message: string
  ) {
    await this.services.conversationService.findConversation(conversationId);
    const createdMessage = await this.services.messageService.createMessage(
      conversationId,
      senderId,
      message
    );
    const senderPseudo = await this.services.userService.findUserById(senderId)
    if (!senderPseudo.username) {
      throw new Error(
        'Can\'t find sender username'
      );
    }
    if (!process.env.MERCURE_JWT) {
      throw new Error(
        'MERCURE_JWT is not defined in the environment variables'
      );
    }
    console.log(senderPseudo.username)
    await this.services.sse.publish<IMessageWithUsername>(
      `/conversations/${conversationId}`,
      {
        id: createdMessage.id,
        conversationId: createdMessage.conversationId,
        senderId: createdMessage.senderId,
        username: senderPseudo.username,
        message: createdMessage.message,
        createdAt: createdMessage.createdAt,
      },
      process.env.MERCURE_JWT
    );

    const messageWithUsername = {
      ...createdMessage,
      username: senderPseudo.username
    } 
    
    return messageWithUsername;
  }
}
