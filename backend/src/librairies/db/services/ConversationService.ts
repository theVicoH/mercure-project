import { FindOptions, Model, Op, Transaction } from 'sequelize';
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

  async findConversationsByUserId(
    userId: number,
    transaction?: Transaction
  ): Promise<ConversationCustomTypes[]> {
    const options: FindOptions = {
      include: [{
          model: UserModel,
          as: 'Participants',
          attributes: ['username'],
          through: {
              where: { userId: { [Op.ne]: userId } }
          }
      }, {
          model: MessageModel,
          as: 'Messages',
          limit: 1,
          order: [['createdAt', 'DESC']],
          include: [{
              model: UserModel,
              attributes: ['username']
          }]
      }],
      transaction: transaction
  };


    let conversations = (await ConversationModel.findAll(
      options
    )) as ConversationInstance[];

    conversations = conversations.sort((a, b) => {
      const aLastMsgTime = a.Messages && a.Messages[0] ? a.Messages[0].createdAt.getTime() : 0;
      const bLastMsgTime = b.Messages && b.Messages[0] ? b.Messages[0].createdAt.getTime() : 0;
  
      return bLastMsgTime - aLastMsgTime;
  });
  
    return conversations.map(conv => {
      const friend = conv.Participants?.find(p => p.id !== userId);
      const lastMessage = conv.Messages?.[0];

      return {
        id: conv.id,
        friendUsername: friend ? friend.username : null,
        message: lastMessage ? lastMessage.message : null,
        messageSentAt: lastMessage ? lastMessage.createdAt : null,
        lastMessageRead: lastMessage ? lastMessage.read : null,
      };
    });
  }

}
