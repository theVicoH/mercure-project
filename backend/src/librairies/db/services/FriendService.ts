import { Model, Transaction } from 'sequelize';
import { Friend } from '../../../entities/FriendEntities';
import IFriendService from '../../../ports/librairies/db/services/IFriendService';
import FriendModel from '../models/FriendModel';

interface FriendModelInstance extends Model {
  userId: number;
  friendId: number;
  createdAt: Date;
}

export default class FriendService implements IFriendService {
  async checkFriendship(
    userId: number,
    friendId: number,
    transaction?: Transaction
  ): Promise<Friend> {
    const options: {
      where: { userId: number; friendId: number };
      transaction?: Transaction;
    } = {
      where: { userId, friendId },
    };

    if (transaction) {
      options.transaction = transaction;
    }
    const friendModel = (await FriendModel.findOne(
      options
    )) as FriendModelInstance;
    if (!friendModel) {
      throw new Error('Friend not found');
    }
    return new Friend(
      friendModel.userId,
      friendModel.friendId,
      friendModel.createdAt
    );
  }

  async createFriendConnection(
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
}
