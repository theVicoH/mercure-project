import { config } from 'dotenv';
import { User } from '../entities/UserEntities';
import { IUseCasesConstructor, IUserInfo, IUserUseCase } from '../types/IUseCases';

config();
export class UserUseCase implements IUserUseCase {
  constructor(private services: IUseCasesConstructor) {}

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
    if (!userFound) {
      throw new Error('User not found');
    }

    const isMatch = await this.services.password.comparePassword(
      password,
      userFound.password
    );
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    if (!process.env.JWT_SECRET) {
      throw new Error(
        'JWT_SECRET is not defined in the environment variables.'
      );
    }

    const expiration = Date.now() + 3 * 30 * 24 * 60 * 60 * 1000;
    const jwt = this.services.jsonWebToken.signToken(
      { userId: userFound.id },
      process.env.JWT_SECRET,
      expiration
    );
    return jwt;
  }

  async findUserById(userId: number): Promise<IUserInfo> {
    const userFound = await this.services.userService.findUserById(userId);  

    const userInfo: IUserInfo = {
      username: userFound.username,
      createdAt: userFound.createdAt,
    };

    return userInfo;
  }

}
