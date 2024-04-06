import { User } from '../../entities/UserEntities';

export default interface IUserRepository {
  createUser: (username: string, password: string) => Promise<User>;
}
