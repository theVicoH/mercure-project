import { Model, Transaction } from 'sequelize';
import { Message } from '../../../entities/MessageEntities';
import { IMessageService } from '../../../types/IServices';
import MessageModel from '../models/MessageModel';

interface MessageModelInstance extends Model {
  id: number;
  conversationId: number;
  senderId: number;
  message: string;
  createdAt: Date;
}

export default class MessageService implements IMessageService {
  async createMessage(
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
      messageModel.createdAt
    );
  }
}
