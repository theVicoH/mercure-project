import { DataTypes } from 'sequelize';
import sequelize from '../Sequalize';

const MessageModel = sequelize.define(
  'Message',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'conversations',
        key: 'id',
      },
      onDelete: 'CASCADE',
      field: 'conversation_id',
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      field: 'sender_id',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
  },
  {
    timestamps: false,
    tableName: 'messages',
    freezeTableName: true,
    indexes: [
      {
        name: 'idx_messages_created_at',
        fields: ['created_at'],
      },
    ],
  }
);

export default MessageModel;
