import IFriendUseCase from '../ports/useCases/IFriendUseCase';
import IUseCasesConstructor from '../ports/librairies/utils/IUseCasesConstructor';

export class FriendUseCase implements IFriendUseCase {
  constructor(private services: IUseCasesConstructor) {}

  async addFriend(userId: number, friendUsername: string) {
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
