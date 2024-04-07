import IUseCasesConstructor from "../ports/librairies/utils/IUseCasesConstructor";
import IConversationUserUseCase from "../ports/useCases/IConversationUserUseCase";

export class ConversationUserUseCase implements IConversationUserUseCase {
  constructor(
    private services: IUseCasesConstructor
  ) {}

}
