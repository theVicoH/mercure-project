import {
  IConversationUserUseCase,
  IUseCasesConstructor,
} from '../types/IUseCases';

export class ConversationUserUseCase implements IConversationUserUseCase {
  constructor(private services: IUseCasesConstructor) {}
}
