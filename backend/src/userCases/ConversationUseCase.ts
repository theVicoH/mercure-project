import { IConversationUseCase, IUseCasesConstructor } from '../types/IUseCases';
import { ConversationCustomTypes } from '../types/types';

export class ConversationUseCase implements IConversationUseCase {
  constructor(private services: IUseCasesConstructor) {}

  public async findUserConversations(
    userId: number
  ): Promise<ConversationCustomTypes[]> {
    console.log(false);

    const conversations =
      await this.services.conversationService.findConversationsByUserId(userId);
    console.log(conversations);

    if (!conversations) {
      throw new Error('No conversations found');
    }
    console.log(conversations);
    return conversations;
  }
}
