import { config } from 'dotenv';
import { User } from '../entities/UserEntities';
import {
  IUseCasesConstructor,
  IUserInfo,
  IUserUseCase,
} from '../types/IUseCases';

config();
export class UserUseCase implements IUserUseCase {
  constructor(private services: IUseCasesConstructor) {}

  public async createUser(
    username: string,
    password: string,
    photo: string
  ): Promise<User> {
    const hashedPassword = await this.services.password.hashPassword(password);
    const createdUser = await this.services.userService.createUser(
      username,
      hashedPassword,
      photo
    );
    return createdUser;
  }

  public async findUser(username: string, password: string): Promise<string> {
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

  public async findUserById(userId: number): Promise<IUserInfo> {
    const userFound = await this.services.userService.findUserById(userId);

    const userInfo: IUserInfo = {
      id: userFound.id,
      username: userFound.username,
      photo: userFound.photo,
      createdAt: userFound.createdAt,
    };

    return userInfo;
  }

  public async findUsersByConversationId(conversationId: number): Promise<IUserInfo[]> {
    const usersFound = await this.services.userService.findUsersByConversationId(conversationId); 

    if (!usersFound || usersFound.length === 0 || usersFound === null) {
      throw new Error('The users of the conversation not found');
    }
    
    const usersInfoPromises: Promise<IUserInfo>[] = usersFound.map(async (user) => {
    
      const User = await this.services.userService.findUserById(user.userId);
      
      return {
        id: User.id,
        username: User.username,
        photo: User.photo,
        createdAt: User.createdAt,
      };
    });

    const usersInfo = await Promise.all(usersInfoPromises);

    return usersInfo;
  }
}
