import IUseCasesConstructor from "../ports/librairies/utils/IUseCasesConstructor";
import IMessageUseCase from "../ports/useCases/IMessageUseCase";

export class MessageUseCase implements IMessageUseCase {
  constructor(
    private services: IUseCasesConstructor
  ) {}

}
