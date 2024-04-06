import { User } from '../../entities/UserEntities';
import IPassword from '../../ports/librairies/password/IPassword';
import IUserRepository from '../../ports/adapters/repositories/IUserRepository';
import IUserService from '../../ports/librairies/services/IUserService';
import IJsonWebToken from '../../ports/librairies/jsonWebToken/IJsonWebToken';

export class UserRepository implements IUserRepository {
  constructor(
    private UserService: IUserService,
    private Password: IPassword,
    private JsonWebToken: IJsonWebToken
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await this.Password.hashPassword(password);
    const createdUser = await this.UserService.createUser(
      username,
      hashedPassword
    );
    return createdUser;
  }

  async findUser(username: string, password: string): Promise<string> {
    const userFound = await this.UserService.findUser(username);
    const isMatch = await this.Password.comparePassword(
      password,
      userFound.password
    );
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const expiration = Date.now() + 3 * 30 * 24 * 60 * 60 * 1000;
    const jwt = this.JsonWebToken.signToken(userFound.id, expiration);
    return jwt;
  }
}
