import { Message } from '../entities/MessageEntities';
import { User } from '../entities/UserEntities';
import { Notification } from '../entities/NotificationEntities';
import { IJsonWebToken } from './IJsonWebToken';
import { IMercure } from './IMercure';
import { IPassword } from './IPassword';
import {
  IConversationService,
  IConversationUserService,
  IFriendService,
  IMessageService,
  INotificationService,
  IUserService,
} from './IServices';
import { Sequelize } from 'sequelize';

export interface IUserUseCase {
  createUser: (username: string, password: string, photo: Buffer) => Promise<User>;
  findUser: (username: string, password: string) => Promise<string>;
  findUserById: (userId: number) => Promise<IUserInfo>;
}

export interface IMessageUseCase {
  createMessage: (
    conversationId: number,
    senderId: number,
    message: string
  ) => Promise<IMessageWithUsername>;
  messageFeed: (
    conversationId: number
  ) => Promise<Message[]>;
}

export interface INotificationUseCase {
  createNotification: (userId: number, recipientId: number, type: string) => Promise<Notification>; 
  findNotificationsByUserId: (userId: number) => Promise<Notification[]>;
}

export interface IFriendUseCase {
  addFriend: (userId: number, friendUsername: string) => void;
  findFriendsByUserId: (userId: number) => Promise<IUserInfo[]>;
}

export interface IConversationUserUseCase {}

export interface IConversationUseCase {}

export interface IUseCasesConstructor {
  userService: IUserService;
  friendService: IFriendService;
  conversationService: IConversationService;
  conversationUserService: IConversationUserService;
  messageService: IMessageService;
  notificationService: INotificationService;
  password: IPassword;
  jsonWebToken: IJsonWebToken;
  orm: Sequelize;
  sse: IMercure;
}

export interface IUserInfo {
  username: string;
  photo: Buffer;
  createdAt: Date;
}

export interface IMessageWithUsername extends Message {
  username: string
}