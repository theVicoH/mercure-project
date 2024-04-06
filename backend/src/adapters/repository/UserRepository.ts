import { User } from '../../entities/UserEntities';
import IPassword from '../../ports/password/IPassword';
import IUserRepository from '../../ports/repositories/IUserRepository';
import IUserService from '../../ports/services/IUserService';

export class UserRepository implements IUserRepository {
  constructor(
    private Password: IPassword,
    private UserService: IUserService
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await this.Password.hashPassword(password);
    const createdUser = await this.UserService.createUser(
      username,
      hashedPassword
    );
    return createdUser;
  }
}
