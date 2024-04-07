import { Model, Transaction } from 'sequelize';
import { Conversation } from '../../../entities/ConversationEntities';
import IConversationService from '../../../ports/librairies/db/services/IConversationService';
import ConversationModel from '../models/ConversationModel';

interface ConversationModelInstance extends Model {
  id: number;
  createdAt: Date;
}

export default class ConversationService implements IConversationService {
  async createConversation(transaction?: Transaction): Promise<Conversation> {
    const options = transaction ? { transaction } : undefined;
    const modelConversation = (await ConversationModel.create(
      {},
      options
    )) as ConversationModelInstance;
    return new Conversation(modelConversation.id, modelConversation.createdAt);
  }
}
