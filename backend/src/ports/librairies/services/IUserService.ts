import { Transaction } from 'sequelize';
import { User } from '../../../entities/UserEntities';

export default interface IUserService {
  createUser: (
    username: string,
    password: string,
    transaction?: Transaction
  ) => Promise<User>;
  findUser: (username: string, transaction?: Transaction) => Promise<User>;
}
