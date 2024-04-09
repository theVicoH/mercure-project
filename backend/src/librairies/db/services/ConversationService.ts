import { Model, Transaction } from 'sequelize';
import { Conversation } from '../../../entities/ConversationEntities';
import ConversationModel from '../models/ConversationModel';
import { IConversationService } from '../../../types/IServices';

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

  async findConversation(conversationId: number): Promise<Conversation> {
    const modelConversation = (await ConversationModel.findByPk(conversationId)) as ConversationModelInstance;
    if(!modelConversation){
      throw new Error("Conversation not found");
    }
    return new Conversation(modelConversation.id, modelConversation.createdAt);
  }
}
