import { FindOptions, Model, Op, QueryTypes, Transaction } from 'sequelize';
import { Conversation } from '../../../entities/ConversationEntities';
import ConversationModel from '../models/ConversationModel';
import {
  ConversationInstance,
  IConversationService,
} from '../../../types/IServices';
import UserModel from '../models/UserModel';
import MessageModel from '../models/MessageModel';
import { ConversationCustomTypes } from '../../../types/types';
import ConversationUserModel from '../models/ConversationUserModel';
import sequelize from '../Sequalize';

interface ConversationModelInstance extends Model {
  id: number;
  createdAt: Date;
}

UserModel.belongsToMany(ConversationModel, {
  through: ConversationUserModel,
  foreignKey: 'userId',
  as: 'Conversations',
});
ConversationModel.belongsToMany(UserModel, {
  through: ConversationUserModel,
  foreignKey: 'conversationId',
  as: 'Participants',
});

export default class ConversationService implements IConversationService {
  public async createConversation(
    transaction?: Transaction
  ): Promise<Conversation> {
    const options = transaction ? { transaction } : undefined;
    const modelConversation = (await ConversationModel.create(
      {},
      options
    )) as ConversationModelInstance;
    return new Conversation(modelConversation.id, modelConversation.createdAt);
  }

  public async findConversation(
    conversationId: number,
    transaction?: Transaction
  ): Promise<Conversation> {
    const options = transaction ? { transaction } : undefined;
    const modelConversation = (await ConversationModel.findByPk(
      conversationId,
      options
    )) as ConversationModelInstance;
    if (!modelConversation) {
      throw new Error('Conversation not found');
    }
    return new Conversation(modelConversation.id, modelConversation.createdAt);
  }

  public async findConversationsByUserId(
    userId: number,
  ): Promise<ConversationCustomTypes[]> {
    const conversations : ConversationCustomTypes[] = await sequelize.query(`
      SELECT 
        c.id, 
        u.id AS "friendId",
        u.username AS "friendUsername", 
        u.photo AS "friendPhoto",
        m.message, 
        m.created_at AS "messageSentAt", 
        CAST(
          (SELECT COUNT(*) 
          FROM messages 
          WHERE read = false AND sender_id != :userId AND conversation_id = c.id AND sender_id = u.id
          ) AS INTEGER
        ) AS "numberOfUnreadMessages"
      FROM conversations AS c
      JOIN conversation_users AS cu ON c.id = cu.conversation_id
      JOIN users AS u ON cu.user_id = u.id AND u.id != :userId
      LEFT JOIN messages AS m ON m.id = (
          SELECT MAX(id) FROM messages WHERE conversation_id = c.id
      )
      WHERE :userId IN (SELECT user_id FROM conversation_users WHERE conversation_id = c.id)
      ORDER BY m.created_at DESC
    `, {
      replacements: { userId },
      type: QueryTypes.SELECT,
    })
    return conversations;
  }
  
}
