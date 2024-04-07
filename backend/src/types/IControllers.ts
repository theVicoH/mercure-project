import { ResponseController } from "./Response";

export interface IUserController {
  register: (username: string, password: string) => Promise<ResponseController>;
}

export interface IMessageController {}
export interface IFriendController {
  addFriend: (
    userId: number,
    friendUsername: string
  ) => Promise<ResponseController>;
}

export interface IConversationUserController {}

export interface IConversationController {}
