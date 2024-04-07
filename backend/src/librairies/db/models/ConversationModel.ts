import { DataTypes } from 'sequelize';
import sequelize from '../Sequalize';

const ConversationModel = sequelize.define(
  'Conversation',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
  },
  {
    timestamps: false,
    tableName: 'conversations',
    freezeTableName: true,
  }
);

export default ConversationModel;