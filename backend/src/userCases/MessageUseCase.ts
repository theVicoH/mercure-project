import { IMessageUseCase, IUseCasesConstructor } from '../types/IUseCases';

export class MessageUseCase implements IMessageUseCase {
  constructor(private services: IUseCasesConstructor) {}
}
