import { Model, UniqueConstraintError } from "sequelize";
import { User } from "../../../entities/UserEntities";
import IUserService from "../../../ports/services/IUserService";
import UserModel from "../models/UserModel";

interface UserModelInstance extends Model {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
}

export default class UserService implements IUserService {
  async createUser(username: string, password: string): Promise<User> {
    try {
      const modelUser = await UserModel.create({ 
        username: username, 
        password: password
      }) as UserModelInstance;
      return new User(modelUser.id, modelUser.username, modelUser.password, modelUser.createdAt);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new Error("username is not unique");
      } else {
        throw error;
      }
    }
  }
}
