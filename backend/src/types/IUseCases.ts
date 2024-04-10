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

export interface IUserUseCase {
  createUser: (username: string, password: string) => Promise<User>;
  findUser: (username: string, password: string) => Promise<string>;
  findUserById: (userId: number) => Promise<IUserInfo>;
}

export interface IMessageUseCase {
  createMessage: (
    conversationId: number,
    senderId: number,
    message: string
  ) => Promise<IMessageWithUsername>;
}

export interface IFriendUseCase {
  addFriend: (userId: number, friendUsername: string) => void;
}

export interface IConversationUserUseCase {}

export interface IConversationUseCase {}

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
  username: string;
  createdAt: Date;
}

export interface IMessageWithUsername extends Message {
  username: string
}