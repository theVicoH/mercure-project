import { Transaction } from 'sequelize';
import { Conversation } from '../../../entities/ConversationEntities';

export default interface IConversationService {
  createConversation: (transaction?: Transaction) => Promise<Conversation>;
}
