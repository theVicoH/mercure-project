import { Friend } from '../../../entities/FriendEntities';
import { IServicesPack, ITransactions } from '../../../types/IServices';
import sequelize from '../Sequalize';

export default class Transactions implements ITransactions {
  constructor(private services: IServicesPack) {}
  async addFriend(userId: number, friendUsername: string) {
    const transaction = await sequelize.transaction();
    try {
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
      const conversation = await this.services.conversationService.createConversation(transaction);

      await this.services.conversationUserService.createConversationUser(conversation.id, userId, transaction);
      await this.services.conversationUserService.createConversationUser(conversation.id, friendId, transaction);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    
  }
}
