import { Message } from '../entities/MessageEntities';
import { User } from '../entities/UserEntities';
import { IJsonWebToken } from './IJsonWebToken';
import { IMercure } from './IMercure';
import { IPassword } from './IPassword';
import {
  IConversationService,
  IConversationUserService,
  IFriendService,
  IMessageService,
  IUserService,
} from './IServices';
import { Sequelize } from 'sequelize';
import { ConversationCustomTypes } from './types';

export interface IUserUseCase {
  createUser: (
    username: string,
    password: string,
    photo: Buffer
  ) => Promise<User>;
  findUser: (username: string, password: string) => Promise<ILoginUseCase>;
  findUserById: (userId: number) => Promise<IUserInfo>;
  findUsersByConversationId: (conversationId: number) => Promise<IUserInfo[]>;
}

export interface IMessageUseCase {
  createMessage: (
    conversationId: number,
    senderId: number,
    message: string
  ) => Promise<IMessageWithUsername>;
  messageFeed: (conversationId: number, userId: number) => Promise<Message[]>;
}

export interface IFriendUseCase {
  addFriend: (userId: number, friendUsername: string) => void;
  findFriendsByUserId: (userId: number) => Promise<IUserInfo[]>;
}

export interface IConversationUserUseCase {}

export interface IConversationUseCase {
  findUserConversations: (userId: number) => Promise<ConversationCustomTypes[]>;
}

export interface IUseCasesConstructor {
  userService: IUserService;
  friendService: IFriendService;
  conversationService: IConversationService;
  conversationUserService: IConversationUserService;
  messageService: IMessageService;
  password: IPassword;
  jsonWebToken: IJsonWebToken;
  orm: Sequelize;
  sse: IMercure;
}

export interface IUserInfo {
  id: number;
  username: string;
  photo: Buffer;
  createdAt: Date;
}

export interface IMessageWithUsername extends Message {
  username: string;
}

export interface INotifcation {
  id: number,
  conversationId: number,
  username: string,
  photo: Buffer,
  message: string,
}

export interface ILoginUseCase {
  jwt: string;
  expiration: number;
}