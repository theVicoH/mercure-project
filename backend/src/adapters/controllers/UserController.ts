import IUserController from '../../ports/adapters/controllers/IUserController';
import IUserRepository from '../../ports/adapters/repositories/IUserRepository';

export class UserController implements IUserController {
  constructor(private userRepository: IUserRepository) {}

  async register(username: string, password: string) {
    try {
      const newUser = await this.userRepository.createUser(username, password);
      return {
        code: 201,
        body: { message: 'User successfully registered', user: newUser },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: 500, body: { message: error.message } };
      } else {
        return { code: 500, body: { message: 'An unknown error occurred' } };
      }
    }
  }

  async login(username: string, password: string){
    try {
      const jwt = await this.userRepository.findUser(username, password);
      return {
        code: 201,
        body: { message: 'User logged', jwt: jwt },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: 500, body: { message: error.message } };
      } else {
        return { code: 500, body: { message: 'An unknown error occurred' } };
      }
    }
  }
}
