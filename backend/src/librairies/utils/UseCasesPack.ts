import { IUseCasesConstructor } from '../../types/IUseCases';
import { Password } from '../bcrypt/Password';
import sequelize from '../db/Sequalize';
import ConversationService from '../db/services/ConversationService';
import ConversationUserService from '../db/services/ConversationUserService';
import FriendService from '../db/services/FriendService';
import MessageService from '../db/services/MessageService';
import UserService from '../db/services/UserService';
import { JsonWebToken } from '../jsonWebToken/JsonWebToken';
import { Mercure } from '../mercure/Mercure';

const useCasesPack: IUseCasesConstructor = {
  userService: new UserService(),
  friendService: new FriendService(),
  conversationService: new ConversationService(),
  conversationUserService: new ConversationUserService(),
  messageService: new MessageService(),
  password: new Password(),
  jsonWebToken: new JsonWebToken(),
  orm: sequelize,
  sse: new Mercure(),
};

export default useCasesPack;
