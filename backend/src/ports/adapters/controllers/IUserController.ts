import { ResponseController } from '../../../types/Response';

export default interface IUserController {
  register: (username: string, password: string) => Promise<ResponseController>;
}
