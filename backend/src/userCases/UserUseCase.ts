import { User } from '../entities/UserEntities';
import IUserUseCase from '../ports/useCases/IUserUseCase';
import IUseCasesConstructor from '../ports/librairies/utils/IUseCasesConstructor';

export class UserUseCase implements IUserUseCase {
  constructor(
    private services: IUseCasesConstructor
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await this.services.password.hashPassword(password);
    const createdUser = await this.services.userService.createUser(
      username,
      hashedPassword
    );
    return createdUser;
  }

  async findUser(username: string, password: string): Promise<string> {
    const userFound = await this.services.userService.findUser(username);
    const isMatch = await this.services.password.comparePassword(
      password,
      userFound.password
    );
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const expiration = Date.now() + 3 * 30 * 24 * 60 * 60 * 1000;
    const jwt = this.services.jsonWebToken.signToken(userFound.id, expiration);
    return jwt;
  }
}
