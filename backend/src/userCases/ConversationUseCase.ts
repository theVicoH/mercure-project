import { IConversationUseCase, IUseCasesConstructor } from '../types/IUseCases';
import { ConversationCustomTypes } from '../types/types';

export class ConversationUseCase implements IConversationUseCase {
  constructor(private services: IUseCasesConstructor) {}

  public async findUserConversations(
    userId: number
  ): Promise<ConversationCustomTypes[]> {

    const conversations =
      await this.services.conversationService.findConversationsByUserId(userId);

    if (!conversations) {
      throw new Error('No conversations found');
    }
    return conversations;
  }
}
