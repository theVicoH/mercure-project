import { DataTypes } from 'sequelize';
import sequelize from '../Sequalize';

const ConversationUserModel = sequelize.define('ConversationUser', {
  conversationId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'conversations',
      key: 'id',
    },
    onDelete: 'CASCADE',
    field: 'conversation_id',
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    field: 'user_id',
    primaryKey: true,
  },
}, {
  timestamps: false,
  tableName: 'conversation_users',
  freezeTableName: true,
});

export default ConversationUserModel;
