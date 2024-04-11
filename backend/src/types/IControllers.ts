import { Message } from '../entities/MessageEntities';
import { User } from '../entities/UserEntities';
import { IMessageWithUsername, IUserInfo } from './IUseCases';
import { ResponseController } from './Response';

export interface IUserController {
  register: (username: string, password: string, photo: Buffer) => Promise<ResponseController<User>>;
  login: (username: string, password: string) => Promise<ResponseController<string>>;
  getUserInfo: (userId: number) => Promise<ResponseController<IUserInfo>>;
}

export interface IMessageController {
  sendMessage: (
    conversationId: number,
    senderId: number,
    message: string
  ) => Promise<ResponseController<IMessageWithUsername>>;
  messageFeed: (
    conversation: number
  ) => Promise<ResponseController<Message[]>>
}
export interface IFriendController {
  addFriend: (
    userId: number,
    friendUsername: string
  ) => Promise<ResponseController>;
  getAllFriends: (userId: number) => Promise<ResponseController<IUserInfo[]>>;
}

export interface INotificationController {
  generateNotification: (
    userId: number,
    recipientId: number,
    type: string
  ) => Promise<ResponseController>;
}

export interface IConversationUserController {}

export interface IConversationController {}
