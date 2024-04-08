import { User } from "../entities/UserEntities";
import { IJsonWebToken } from "./IJsonWebToken";
import { IPassword } from "./IPassword";
import { IConversationService, IConversationUserService, IFriendService, IMessageService, IUserService } from "./IServices";
import { Sequelize, Transaction } from "sequelize";

export interface IUserUseCase {
  createUser: (username: string, password: string) => Promise<User>;
  findUser: (username: string, password: string) => Promise<string>;
}

export interface IMessageUseCase {}

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
}