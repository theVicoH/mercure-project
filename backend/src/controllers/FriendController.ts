import { IFriendController } from '../types/IControllers';
import { IFriendUseCase, IUserInfo } from '../types/IUseCases';
import { ResponseController } from '../types/Response';

export class FriendController implements IFriendController {
  constructor(private friendUseCase: IFriendUseCase) {}

  public async addFriend(userId: number, friendUsername: string) : Promise<ResponseController> {
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

  public async getAllFriends(userId: number) : Promise<ResponseController<IUserInfo[]>> {
    try {    
      const friendsInfo = await this.friendUseCase.findFriendsByUserId(userId);

      return { code: 200, body: { message: 'Friends informations retrieved successfully', data: friendsInfo } };
      
    } catch (error) {
        if (error instanceof Error && error.message === 'Friends not found') {
          return { code: 404, body: { message: error.message } };
        } else {
          return { code: 500, body: { message: 'An unknown error occurred' } };
        }
      }
  }
}
