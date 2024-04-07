import IUseCasesConstructor from '../ports/librairies/utils/IUseCasesConstructor';
import { IConversationUserUseCase } from '../types/IUseCases';

export class ConversationUserUseCase implements IConversationUserUseCase {
  constructor(private services: IUseCasesConstructor) {}
}
