import { Model, Transaction } from 'sequelize';
import ConversationUser from '../../../entities/ConversationUserEntities';
import IConversationUserService from '../../../ports/librairies/services/IConversationUserService';
import ConversationUserModel from '../models/ConversationUserModel';

interface ConversationUserModelInstance extends Model {
  conversationId: number;
  userId: number;
}

export default class ConversationUserService
  implements IConversationUserService
{
  async createConversationUser(
    conversationId: number,
    userId: number,
    transaction?: Transaction
  ): Promise<ConversationUser> {
    const options = transaction ? { transaction } : undefined;
    const modelConversationUser = (await ConversationUserModel.create(
      { conversationId: conversationId, userId: userId },
      options
    )) as ConversationUserModelInstance;
    return new ConversationUser(
      modelConversationUser.conversationId,
      modelConversationUser.userId
    );
  }
}
