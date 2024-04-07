import { ResponseController } from "./Response";

export interface IUserController {
  register: (username: string, password: string) => Promise<ResponseController>;
}
