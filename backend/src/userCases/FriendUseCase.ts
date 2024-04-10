import { IFriendUseCase, IUseCasesConstructor } from '../types/IUseCases';

export class FriendUseCase implements IFriendUseCase {
  constructor(private services: IUseCasesConstructor) {}

  public async addFriend(userId: number, friendUsername: string) {
    const transaction = await this.services.orm.transaction();
    try {
      const user = await this.services.userService.findUserById(userId)
      if(user.username===friendUsername){
        throw new Error("You can't be friend with yourself");
      }
      const friendFound =
        await this.services.userService.findUser(friendUsername);
      if (!friendFound) {
        throw new Error("This user don't exist");
      }
      const friendId = friendFound.id;

      const exists = await this.services.friendService.checkFriendship(
        userId,
        friendId,
        transaction
      );
      if (exists) {
        throw new Error(`You are already friend with ${friendUsername}`);
      }
      const friend = await this.services.friendService.createFriendConnection(
        userId,
        friendId,
        transaction
      );

      const conversation =
        await this.services.conversationService.createConversation(transaction);
      if (!conversation) {
        throw new Error("Can't create conversation");
      }
      const conversationUser =
        await this.services.conversationUserService.createConversationUser(
          conversation.id,
          userId,
          transaction
        );
      if (!conversationUser) {
        throw new Error("Can't add user to the conversation");
      }
      const conversationFriend =
        await this.services.conversationUserService.createConversationUser(
          conversation.id,
          friendId,
          transaction
        );
      if (!conversationFriend) {
        throw new Error("Can't add friend to the conversation");
      }
      await transaction.commit();

      return friend;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
