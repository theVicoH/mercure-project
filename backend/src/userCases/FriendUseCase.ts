import IUserService from '../ports/librairies/services/IUserService';
import IFriendUseCase from '../ports/useCases/IFriendUseCase';
import IFriendService from '../ports/librairies/services/IFriendService';

export class FriendUseCase implements IFriendUseCase {
  constructor(
    private FriendService: IFriendService,
    private UserService: IUserService
  ) {}

  async addFriend(userId: number, friendUsername: string) {
    const friendFound = await this.UserService.findUser(friendUsername);
    if (!friendFound) {
      throw new Error("This user don' exist");
    }
    const friendId = friendFound.id;

    const exists = await this.FriendService.checkFriendship(userId, friendId);
    if (exists) {
      throw new Error(`You are already friend with ${friendUsername}`);
    }
    await this.FriendService.createFriendConnection(userId, friendId);
  }
}
