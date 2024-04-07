import { DataTypes } from 'sequelize';
import sequelize from '../Sequalize';

const FriendModel = sequelize.define(
  'Friend',
  {
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      field: 'user_id',
      primaryKey: true, 
    },
    friendId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      field: 'friend_id',
      primaryKey: true,
    },
    createdAt: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
  },
  {
    timestamps: false,
    tableName: 'friends',
    freezeTableName: true,
  }
);

export default FriendModel;