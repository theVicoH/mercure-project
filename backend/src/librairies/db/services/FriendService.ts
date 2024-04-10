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
  ): Promise<Friend> {
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
      throw new Error('Already Friend');
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
}
