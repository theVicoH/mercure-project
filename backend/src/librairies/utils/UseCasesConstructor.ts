import IUseCasesConstructor from "../../ports/librairies/utils/IUseCasesConstructor";
import { Password } from "../bcrypt/Password";
import ConversationService from "../db/services/ConversationService";
import ConversationUserService from "../db/services/ConversationUserService";
import FriendService from "../db/services/FriendService";
import MessageService from "../db/services/MessageService";
import UserService from "../db/services/UserService";
import { JsonWebToken } from "../jsonWebToken/JsonWebToken";

const useCasesConstructor: IUseCasesConstructor = {
  userService: new UserService(),
  friendService: new FriendService(),
  conversationService: new ConversationService(),
  conversationUserService: new ConversationUserService(),
  messageService: new MessageService(),
  password: new Password(),
  jsonWebToken: new JsonWebToken()
};


export default useCasesConstructor;