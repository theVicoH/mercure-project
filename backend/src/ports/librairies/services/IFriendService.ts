import { Friend } from '../../../entities/FriendEntities';

export default interface IFriendService {
  checkFriendship: (userId: number, friendId: number) => Promise<boolean>;
  createFriendConnection: (userId: number, friendId: number) => Promise<Friend>;
}
