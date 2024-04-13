import { User } from '../entities/UserEntities';
import { IUserController } from '../types/IControllers';
import { IUserInfo, IUserUseCase } from '../types/IUseCases';
import { ResponseController } from '../types/Response';

export class UserController implements IUserController {
  constructor(private userUseCase: IUserUseCase) {}

  public async register(
    username: string,
    password: string,
    photo: string
  ): Promise<ResponseController<User>> {
    console.log(true)
    console.log(username)
    console.log(photo)
    try {
      const newUser = await this.userUseCase.createUser(
        username,
        password,
        photo
      );
      return {
        code: 201,
        body: { message: 'User successfully registered', data: newUser },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: 500, body: { message: error.message } };
      } else {
        return { code: 500, body: { message: 'An unknown error occurred' } };
      }
    }
  }

  public async login(
    username: string,
    password: string
  ): Promise<ResponseController<string>> {
    try {
      const jwt = await this.userUseCase.findUser(username, password);
      return {
        code: 200,
        body: { message: 'User logged', data: jwt },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: 500, body: { message: error.message } };
      } else {
        return { code: 500, body: { message: 'An unknown error occurred' } };
      }
    }
  }

  public async getUserInfo(
    userId: number
  ): Promise<ResponseController<IUserInfo>> {
    try {
      const userInfo = await this.userUseCase.findUserById(userId);

      if (userInfo) {
        return {
          code: 200,
          body: {
            message: 'User information retrieved successfully',
            data: userInfo,
          },
        };
      } else {
        return { code: 404, body: { message: 'User not found' } };
      }
    } catch (error) {
      return { code: 500, body: { message: 'Internal server error' } };
    }
  }
}
