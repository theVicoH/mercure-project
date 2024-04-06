import bcrypt from 'bcryptjs';
import IPassword from '../../ports/librairies/password/IPassword';

export class Password implements IPassword {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
