import IJsonWebToken from '../jsonWebToken/IJsonWebToken';
import IPassword from '../password/IPassword';
import IConversationService from '../services/IConversationService';
import IConversationUserService from '../services/IConversationUserService';
import IFriendService from '../services/IFriendService';
import IMessageService from '../services/IMessageService';
import IUserService from '../services/IUserService';

interface IUseCasesConstructor {
  userService: IUserService;
  friendService: IFriendService;
  conversationService: IConversationService;
  conversationUserService: IConversationUserService;
  messageService: IMessageService;
  password: IPassword;
  jsonWebToken: IJsonWebToken;
}

export default IUseCasesConstructor;
