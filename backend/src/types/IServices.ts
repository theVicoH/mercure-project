import { Model, Transaction, Optional } from 'sequelize';
import { Friend } from '../entities/FriendEntities';
import { Conversation } from '../entities/ConversationEntities';
import ConversationUser from '../entities/ConversationUserEntities';
import { User } from '../entities/UserEntities';
import { Message } from '../entities/MessageEntities';
import { ConversationCustomTypes } from './types';

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
  findFriendInConversation: (myUserId: number, conversationId: number, transaction?: Transaction) => Promise<User | null>;
  findUsersByConversationId: (conversationId: number, transaction?: Transaction) => Promise<ConversationUser[] | null>;
}

export interface IMessageService {
  createMessage: (
    conversationId: number,
    senderId: number,
    message: string
  ) => Promise<Message>;
  findAllMessage: (conversationId: number) => Promise<Message[]>;
  updateReadMessages: (userId: number) => Promise<void>;
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
  findFriendsByUserId: (userId: number, transaction?: Transaction) => Promise<Friend[] | null>;
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
  findConversation: (
    conversationId: number,
    transaction?: Transaction
  ) => Promise<Conversation>;
  findConversationsByUserId: (
    userId: number,
    transaction?: Transaction
  ) => Promise<ConversationCustomTypes[]>;
}

interface UserAttributes {
  id: number;
  username: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

interface ConversationAttributes {
  id: number;
}

interface ConversationCreationAttributes
  extends Optional<ConversationAttributes, 'id'> {}

export interface ConversationInstance
  extends Model<ConversationAttributes, ConversationCreationAttributes>,
    ConversationAttributes {
  Participants?: UserInstance[];
  Messages?: MessageInstance[];
}

interface MessageAttributes {
  id: number;
  message: string;
  createdAt: Date;
  read: boolean;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

interface MessageInstance
  extends Model<MessageAttributes, MessageCreationAttributes>,
    MessageAttributes {
  User?: UserInstance; // Single user associated with the message
}
