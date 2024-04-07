import IUseCasesConstructor from '../ports/librairies/utils/IUseCasesConstructor';
import { IMessageUseCase } from '../types/IUseCases';

export class MessageUseCase implements IMessageUseCase {
  constructor(private services: IUseCasesConstructor) {}
}
