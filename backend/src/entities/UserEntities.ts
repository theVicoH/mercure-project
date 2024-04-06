export class User {
  public id: number;
  public username: string;
  public password: string;
  public createdAt: Date;

  constructor(
    id: number,
    username: string,
    password: string,
    createdAt: Date
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.createdAt = createdAt;
  }
}
