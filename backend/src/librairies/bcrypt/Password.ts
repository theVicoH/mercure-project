import bcrypt from 'bcryptjs';
import { IPassword } from '../../types/IPassword';

export class Password implements IPassword {
  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
