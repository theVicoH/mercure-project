import { FindOptions, Model, Op, OrderItem, Transaction, UpdateOptions } from 'sequelize';
import { Message } from '../../../entities/MessageEntities';
import { IMessageService } from '../../../types/IServices';
import MessageModel from '../models/MessageModel';
import ConversationUserModel from '../models/ConversationUserModel';
import UserModel from '../models/UserModel';

interface MessageModelInstance extends Model {
  id: number;
  conversationId: number;
  senderId: number;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface CustomConversationUserModelInstance extends Model {
  userId: number;
}

export default class MessageService implements IMessageService {
  public async createMessage(
    conversationId: number,
    senderId: number,
    message: string,
    transaction?: Transaction
  ): Promise<Message> {
    const options = transaction ? { transaction } : undefined;

    const messageModel = (await MessageModel.create(
      {
        conversationId: conversationId,
        senderId: senderId,
        message: message,
      },
      options
    )) as MessageModelInstance;
    return new Message(
      messageModel.id,
      messageModel.conversationId,
      messageModel.senderId,
      messageModel.message,
      messageModel.read,
      messageModel.createdAt
    );
  }

  public async findAllMessage(
    conversationId: number,
    transaction?: Transaction
  ): Promise<Message[]> {
    const options: FindOptions = {
      where: { conversationId },
      order: [['createdAt', 'ASC']] as OrderItem[],
    };

    if (transaction) {
      options.transaction = transaction;
    }

    const messageModels = (await MessageModel.findAll(
      options
    )) as MessageModelInstance[];

    return messageModels.map(
      model =>
        new Message(
          model.id,
          model.conversationId,
          model.senderId,
          model.message,
          model.read,
          model.createdAt
        )
    );
  }

  public async markMessagesAsRead(
    userId: number,
    conversationId: number,
  ): Promise<boolean> {

    const participants = await ConversationUserModel.findAll({
      where: { conversation_id: conversationId },
      include: [{
        model: UserModel,
        attributes: ['id'],
      }]
    }) as CustomConversationUserModelInstance[];
  
    const participantIds = participants.map(part => part.userId).filter(id => id !== userId);
  
    const updateCount = await MessageModel.update(
      { read: true },
      {
        where: {
          conversation_id: conversationId,
          sender_id: participantIds,
          read: false
        }
      }
    );

    if(updateCount){
      return true
    } else {
      return false
    }
  }

}
