import { User } from "../entities/UserEntities";
import { IJsonWebToken } from "./IJsonWebToken";
import { IPassword } from "./IPassword";
import { IServicesPack } from "./IServices";

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

export interface IUseCasesConstructor extends IServicesPack {
  password: IPassword;
  jsonWebToken: IJsonWebToken;
}
