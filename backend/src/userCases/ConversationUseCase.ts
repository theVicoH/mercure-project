import IUseCasesConstructor from '../ports/librairies/utils/IUseCasesConstructor';
import IConversationUseCase from '../ports/useCases/IConversationUseCase';

export class ConversationUseCase implements IConversationUseCase {
  constructor(private services: IUseCasesConstructor) {}
}
