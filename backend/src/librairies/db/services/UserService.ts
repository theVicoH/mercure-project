import { FindOptions, Model, Transaction, UniqueConstraintError } from 'sequelize';
import { User } from '../../../entities/UserEntities';
import UserModel from '../models/UserModel';
import { IUserService } from '../../../types/IServices';

interface UserModelInstance extends Model {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
}

export default class UserService implements IUserService {
  async createUser(
    username: string,
    password: string,
    transaction?: Transaction
  ): Promise<User> {
    try {
      const options = transaction ? { transaction } : undefined;
      const modelUser = (await UserModel.create(
        {
          username,
          password,
        },
        options
      )) as UserModelInstance;

      return new User(
        modelUser.id,
        modelUser.username,
        modelUser.password,
        modelUser.createdAt
      );
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new Error('Username already exist');
      } else {
        throw error;
      }
    }
  }

  async findUser(username: string, transaction?: Transaction): Promise<User> {
    const options: FindOptions =
      {
        where: { username },
      };

    if (transaction) {
      options.transaction = transaction;
    }

    const modelUser = (await UserModel.findOne(options)) as UserModelInstance;

    if (!modelUser) {
      throw new Error('User not found');
    }

    return new User(
      modelUser.id,
      modelUser.username,
      modelUser.password,
      modelUser.createdAt
    );
  }

  async findUserById(userId: number, transaction?: Transaction): Promise<User> {
    const options: FindOptions = {
      where: { id: userId },
    };
  
    if (transaction) {
      options.transaction = transaction;
    }
  
    const modelUser = (await UserModel.findOne(options)) as UserModelInstance;
  
    if (!modelUser) {
      throw new Error('User not found');
    }

    return new User(
      modelUser.id,
      modelUser.username,
      modelUser.password,
      modelUser.createdAt
    );
  }
}
