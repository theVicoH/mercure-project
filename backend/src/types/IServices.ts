import { Transaction } from 'sequelize';
import { Friend } from '../entities/FriendEntities';
import { Conversation } from '../entities/ConversationEntities';
import ConversationUser from '../entities/ConversationUserEntities';
import { User } from '../entities/UserEntities';

export interface ITransactions {
  addFriend: (userId: number, friendUsername: string) => void;
}

export interface IUserService {
  createUser: (
    username: string,
    password: string,
    transaction?: Transaction
  ) => Promise<User>;
  findUser: (username: string, transaction?: Transaction) => Promise<User>;
}

export interface IMessageService {}

export interface IFriendService {
  checkFriendship: (
    userId: number,
    friendId: number,
    transaction?: Transaction
  ) => Promise<Friend>;
  createFriendConnection: (
    userId: number,
    friendId: number,
    transaction?: Transaction
  ) => Promise<Friend>;
}

export interface IConversationUserService {
  createConversationUser: (
    conversationId: number,
    userId: number,
    transaction?: Transaction
  ) => Promise<ConversationUser>;
}

export interface IConversationService {
  createConversation: (transaction?: Transaction) => Promise<Conversation>;
}
