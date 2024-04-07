
import { Model } from 'sequelize';
import { Friend } from '../../../entities/FriendEntities';
import IFriendService from '../../../ports/librairies/services/IFriendService';
import FriendModel from '../models/FriendModel';

interface FriendModelInstance extends Model {
  userId: number;
  friendId: number;
  createdAt: Date;
}

export default class FriendService implements IFriendService {
  async checkFriendship(userId: number, friendId: number): Promise<boolean> {
    const exists = await FriendModel.findOne({ where: { userId, friendId } });
    return !!exists;
  }

  async createFriendConnection(userId: number, friendId: number): Promise<Friend> {
    const friendModel = await FriendModel.create({ userId, friendId }) as FriendModelInstance;
    return new Friend(
      friendModel.userId,
      friendModel.friendId,
      friendModel.createdAt
    );
  }
}
