import IUseCasesConstructor from '../ports/librairies/utils/IUseCasesConstructor';
import { IConversationUseCase } from '../types/IUseCases';

export class ConversationUseCase implements IConversationUseCase {
  constructor(private services: IUseCasesConstructor) {}
}
