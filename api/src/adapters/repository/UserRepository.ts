import { User } from "../../entities/UserEntities";
import IPassword from "../../ports/password/IPassword";
import IUserRepository from "../../ports/repositories/IUserRepository";
import IUserService from "../../ports/services/IUserService";

export class UserRepository implements IUserRepository {
  constructor(private Password: IPassword, private UserService: IUserService) {}

  async createUser(username: string, password: string) : Promise<User> {
    const hashedPassword = await this.Password.hashPassword(password);
    console.log(username, hashedPassword, "=========")
    try {
      const createdUser = await this.UserService.createUser(username, hashedPassword);
      return createdUser;
    } catch (error) {
      throw error;
    }
  };
}