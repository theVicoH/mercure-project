import {
  FindOptions,
  Model,
  Op,
  Transaction,
  UniqueConstraintError,
} from 'sequelize';
import { User } from '../../../entities/UserEntities';
import UserModel from '../models/UserModel';
import { IUserService } from '../../../types/IServices';
import ConversationUserModel from '../models/ConversationUserModel';
import ConversationModel from '../models/ConversationModel';
import ConversationUser from '../../../entities/ConversationUserEntities';

interface UserModelInstance extends Model {
  id: number;
  username: string;
  password: string;
  photo: Buffer;
  createdAt: Date;
}

interface ConversationUserModelInstance extends Model {
  userId: number;
  conversationId: number;
}

export default class UserService implements IUserService {
  public async createUser(
    username: string,
    password: string,
    photo: Buffer,
    transaction?: Transaction
  ): Promise<User> {
    try {
      const options = transaction ? { transaction } : undefined;
      console.log(username)
      console.log(password)
      console.log(photo)
      const modelUser = (await UserModel.create(
        {
          username,
          password,
          photo,
        },
        options
      )) as UserModelInstance;
      
      return new User(
        modelUser.id,
        modelUser.username,
        modelUser.password,
        modelUser.photo,
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

  public async findUser(
    username: string,
    transaction?: Transaction
  ): Promise<User> {
    const options: FindOptions = {
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
      modelUser.photo,
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
      modelUser.photo,
      modelUser.createdAt
    );
  }

  async findFriendInConversation(myUserId: number, conversationId: number, transaction?: Transaction) : Promise<User | null> {
    const options: FindOptions = {
      where: { id: conversationId },
      include: [{
        model: ConversationUserModel,
        required: true,
        include: [{
          model: UserModel,
          where: {
            id: { [Op.ne]: myUserId }
          },
        }]
      }]
    }

    if (transaction) {
      options.transaction = transaction;
    }

    const modelUser = (await ConversationModel.findOne(options)) as UserModelInstance;

    return new User(
      modelUser.id,
      modelUser.username,
      modelUser.password,
      modelUser.photo,
      modelUser.createdAt
    );
  }

  async findUsersByConversationId(conversationId: number, transaction?: Transaction): Promise<ConversationUser[] | null> {
    const options: FindOptions = {
      where: { conversation_id: conversationId },
    };
  
    if (transaction) {
      options.transaction = transaction;
    }
  
    const modelConversationUsers = (await ConversationUserModel.findAll(options)) as ConversationUserModelInstance[];
  
    if (!modelConversationUsers || modelConversationUsers.length === 0) {
      return null;
    }

    return modelConversationUsers.map((ConversationUserModel: ConversationUser) => {
      return new ConversationUser(
        ConversationUserModel.conversationId,
        ConversationUserModel.userId,
      );
    });
  }
}
