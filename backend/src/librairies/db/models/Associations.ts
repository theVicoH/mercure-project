import ConversationModel from './ConversationModel';
import ConversationUserModel from './ConversationUserModel';
import MessageModel from './MessageModel';
import UserModel from './UserModel';

export default function setupAssociations() {
  UserModel.hasMany(MessageModel, { foreignKey: 'senderId' });
  MessageModel.belongsTo(UserModel, { foreignKey: 'senderId' });

  ConversationModel.hasMany(MessageModel, { foreignKey: 'conversationId' });
  MessageModel.belongsTo(ConversationModel, { foreignKey: 'conversationId' });

  UserModel.belongsToMany(ConversationModel, {
    through: ConversationUserModel,
    foreignKey: 'userId',
  });
  ConversationModel.belongsToMany(UserModel, {
    through: ConversationUserModel,
    foreignKey: 'conversationId',
  });
}
