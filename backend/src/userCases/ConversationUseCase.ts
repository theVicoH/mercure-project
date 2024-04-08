import { IConversationUseCase, IUseCasesConstructor } from '../types/IUseCases';

export class ConversationUseCase implements IConversationUseCase {
  constructor(private services: IUseCasesConstructor) {}
}
