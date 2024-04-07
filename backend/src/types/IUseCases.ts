import { User } from "../entities/UserEntities";

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
