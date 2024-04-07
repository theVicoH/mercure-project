import { ResponseController } from '../../types/Response';

export default interface IFriendController {
  addFriend: (
    userId: number,
    friendUsername: string
  ) => Promise<ResponseController>;
}
