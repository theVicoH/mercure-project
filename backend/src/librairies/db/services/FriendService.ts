import { FindOptions, Model, Transaction } from 'sequelize';
import { Friend } from '../../../entities/FriendEntities';
import FriendModel from '../models/FriendModel';
import { IFriendService } from '../../../types/IServices';

interface FriendModelInstance extends Model {
  userId: number;
  friendId: number;
  createdAt: Date;
}

export default class FriendService implements IFriendService {
  public async checkFriendship(
    userId: number,
    friendId: number,
    transaction?: Transaction
  ): Promise<Friend | null> {
    const options: FindOptions = {
      where: { userId, friendId },
    };

    if (transaction) {
      options.transaction = transaction;
    }
    const friendModel = (await FriendModel.findOne(
      options
    )) as FriendModelInstance;

    if (!friendModel) {
      return null;
    }

    return new Friend(
      friendModel.userId,
      friendModel.friendId,
      friendModel.createdAt
    );
  }

  public async createFriendConnection(
    userId: number,
    friendId: number,
    transaction?: Transaction
  ): Promise<Friend> {
    const options = transaction ? { transaction } : undefined;
    const friendModel = (await FriendModel.create(
      {
        userId,
        friendId,
      },
      options
    )) as FriendModelInstance;
    return new Friend(
      friendModel.userId,
      friendModel.friendId,
      friendModel.createdAt
    );
  }

  async findFriendsByUserId(userId: number, transaction?: Transaction): Promise<Friend[] | null> {
    const options: FindOptions = {
      where: { user_id: userId },
    };
  
    if (transaction) {
      options.transaction = transaction;
    }
  
    const modelFriends = (await FriendModel.findAll(options)) as FriendModelInstance[];
  
    if (!modelFriends || modelFriends.length === 0) {
      return null;
    }

    return modelFriends.map((friendModel: Friend) => {
      return new Friend(
        friendModel.userId,
        friendModel.friendId,
        friendModel.createdAt
      );
    });
  }
}
