import { Transaction } from 'sequelize';
import { Friend } from '../entities/FriendEntities';
import { Conversation } from '../entities/ConversationEntities';
import ConversationUser from '../entities/ConversationUserEntities';
import { User } from '../entities/UserEntities';
import { Message } from '../entities/MessageEntities';
import { Notification } from '../entities/NotificationEntities';

export interface ITransactions {
  addFriend: (userId: number, friendUsername: string) => void;
}

export interface IUserService {
  createUser: (
    username: string,
    password: string,
    photo: Buffer,
    transaction?: Transaction
  ) => Promise<User>;
  findUser: (username: string, transaction?: Transaction) => Promise<User>;
  findUserById: (userId: number, transaction?: Transaction) => Promise<User>;
}

export interface IMessageService {
  createMessage: (
    conversationId: number,
    senderId: number,
    message: string
  ) => Promise<Message>;
  findAllMessage: (
    conversationId: number,
  ) => Promise<Message[]>;
}

export interface INotificationService {
  createNotification: (recipientId: number, type:string, message: string, transaction?: Transaction) => Promise<Notification>;
  findNotificationsByUserId: (userId: number) => Promise<Notification[]>;
}

export interface IFriendService {
  checkFriendship: (
    userId: number,
    friendId: number,
    transaction?: Transaction
  ) => Promise<Friend | null>;
  createFriendConnection: (
    userId: number,
    friendId: number,
    transaction?: Transaction
  ) => Promise<Friend>;
  findFriendsByUserId: (userId: number, transaction?: Transaction) => Promise<Friend[]>;
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
  findConversation: (conversationId: number) => Promise<Conversation>;
}
