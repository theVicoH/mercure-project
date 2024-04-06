import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

export const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  logging: false,
});

export const initializeDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connect to the database.');
  } catch (error) {
    console.error("Can' connect to the database.", error);
  }
};

export default sequelize;
