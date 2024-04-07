import ConversationService from '../services/ConversationService';
import ConversationUserService from '../services/ConversationUserService';
import FriendService from '../services/FriendService';
import MessageService from '../services/MessageService';
import UserService from '../services/UserService';


async function servicesPack() : Promise<> {
  return {
    userService: new UserService(),
    friendService: new FriendService(),
    conversationService: new ConversationService(),
    conversationUserService: new ConversationUserService(),
    messageService: new MessageService(),
  }
};

export default servicesPack;
