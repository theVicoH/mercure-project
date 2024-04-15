import { Message } from '../entities/MessageEntities';
import { User } from '../entities/UserEntities';
import { IMessageWithUsername, IUserInfo } from './IUseCases';
import { ResponseController } from './Response';
import { ConversationCustomTypes } from './types';

export interface IUserController {
  register: (
    username: string,
    password: string,
    photo: Buffer
  ) => Promise<ResponseController<User>>;
  login: (
    username: string,
    password: string
  ) => Promise<ResponseController<string>>;
  getUserInfo: (userId: number) => Promise<ResponseController<IUserInfo>>;
  getAllUsersInConversation: (conversationId: number) => Promise<ResponseController<IUserInfo[]>>;
}

export interface IMessageController {
  sendMessage: (
    conversationId: number,
    senderId: number,
    message: string
  ) => Promise<ResponseController<IMessageWithUsername>>;
  messageFeed: (conversation: number, userId: number) => Promise<ResponseController<Message[]>>;
}
export interface IFriendController {
  addFriend: (
    userId: number,
    friendUsername: string
  ) => Promise<ResponseController>;
  getAllFriends: (userId: number) => Promise<ResponseController<IUserInfo[]>>;
}

export interface IConversationUserController {}

export interface IConversationController {
  userConversationsList: (
    userId: number
  ) => Promise<ResponseController<ConversationCustomTypes[]>>;
}
