import { User } from '../../entities/UserEntities';

export default interface IUserUseCase {
  createUser: (username: string, password: string) => Promise<User>;
  findUser: (username: string, password: string) => Promise<string>;
}
