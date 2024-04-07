import { Friend } from '../../../entities/FriendEntities';
import ITransactions from '../../../ports/librairies/db/transactions/ITransactions';

export default class Transactions implements ITransactions {
  async addFriend(userId: number, friendUsername: string) : Promise<Friend> {
    const friendFound =
      await this.services.userService.findUser(friendUsername);
    if (!friendFound) {
      throw new Error("This user don' exist");
    }
    const friendId = friendFound.id;

    const exists = await this.services.friendService.checkFriendship(
      userId,
      friendId
    );
    if (exists) {
      throw new Error(`You are already friend with ${friendUsername}`);
    }
    await this.services.friendService.createFriendConnection(userId, friendId);

  }
}
