import { User } from '../../../entities/UserEntities';

export default interface IUserService {
  createUser: (username: string, password: string) => Promise<User>;
  findUser: (username: string) => Promise<User>;
}
