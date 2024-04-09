import { IMessageUseCase, IUseCasesConstructor } from '../types/IUseCases';

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
    if (!process.env.MERCURE_PUBLISHER_JWT_KEY) {
      throw new Error(
        'MERCURE_PUBLISHER_JWT_KEY is not defined in the environment variables.'
      );
    }
    // const expiration = Date.now() + 3 * 30 * 24 * 60 * 60 * 1000;
    // const jwt = this.services.jsonWebToken.signToken(
    //   {
    //     mercure: {
    //       publish: ['*'],
    //     },
    //   },
    //   process.env.MERCURE_PUBLISHER_JWT_KEY,
    //   expiration
    // );
    await this.services.sse.publish(
      'https://example.com/my-private-topic',
      {
        id: createdMessage.id,
        conversationId: createdMessage.conversationId,
        senderId: createdMessage.senderId,
        message: createdMessage.senderId,
        createdAt: createdMessage.createdAt,
      },
      'eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiaHR0cHM6Ly9leGFtcGxlLmNvbS9teS1wcml2YXRlLXRvcGljIiwie3NjaGVtZX06Ly97K2hvc3R9L2RlbW8vYm9va3Mve2lkfS5qc29ubGQiLCIvLndlbGwta25vd24vbWVyY3VyZS9zdWJzY3JpcHRpb25zey90b3BpY317L3N1YnNjcmliZXJ9Il0sInBheWxvYWQiOnsidXNlciI6Imh0dHBzOi8vZXhhbXBsZS5jb20vdXNlcnMvZHVuZ2xhcyIsInJlbW90ZUFkZHIiOiIxMjcuMC4wLjEifX19.KKPIikwUzRuB3DTpVw6ajzwSChwFw5omBMmMcWKiDcM'
    );
    return createdMessage;
  }
}
