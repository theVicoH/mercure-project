import { IFriendController } from '../types/IControllers';
import { IFriendUseCase } from '../types/IUseCases';

export class FriendController implements IFriendController {
  constructor(private friendUseCase: IFriendUseCase) {}

  async addFriend(userId: number, friendUsername: string) {
    try {
      await this.friendUseCase.addFriend(userId, friendUsername);

      return {
        code: 201,
        body: { message: `You are now friend with ${friendUsername}` },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: 500, body: { message: error.message } };
      } else {
        return { code: 500, body: { message: 'An unknown error occurred' } };
      }
    }
  }
}
