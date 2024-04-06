import { User } from '../../entities/UserEntities';
import IPassword from '../../ports/librairies/password/IPassword';
import IUserRepository from '../../ports/adapters/repositories/IUserRepository';
import IUserService from '../../ports/librairies/services/IUserService';

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

  async findUser(username: string, password: string): Promise<User> {
    const userFound = await this.UserService.findUser(
      username
    );
    const isMatch = await this.Password.comparePassword(password, userFound.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
  
    return userFound;
  }
}
