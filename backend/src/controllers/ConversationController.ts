import { IConversationController } from '../types/IControllers';
import { IConversationUseCase } from '../types/IUseCases';
import { ResponseController } from '../types/Response';
import { ConversationCustomTypes } from '../types/types';

export class ConversationController implements IConversationController {
  constructor(private conversationUseCase: IConversationUseCase) {}

  public async userConversationsList(
    userId: number
  ): Promise<ResponseController<ConversationCustomTypes[]>> {
    try {
      const conversation =
        await this.conversationUseCase.findUserConversations(userId);

      return {
        code: 201,
        body: { message: 'User conversation list found', data: conversation },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: 500, body: { message: error.message } };
      } else {
        return { code: 500, body: { message: 'An unknown error occurred' } };
      }
    }
  }
}
