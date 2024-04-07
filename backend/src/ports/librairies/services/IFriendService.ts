import { Transaction } from 'sequelize';
import { Friend } from '../../../entities/FriendEntities';

export default interface IFriendService {
  checkFriendship: (
    userId: number,
    friendId: number,
    transaction?: Transaction
  ) => Promise<Friend>;
  createFriendConnection: (
    userId: number,
    friendId: number,
    transaction?: Transaction
  ) => Promise<Friend>;
}
