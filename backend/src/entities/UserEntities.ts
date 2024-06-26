export class User {
  public id: number;
  public username: string;
  public password: string;
  public photo: Buffer;
  public createdAt: Date;

  constructor(
    id: number,
    username: string,
    password: string,
    photo: Buffer,
    createdAt: Date
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.photo = photo;
    this.createdAt = createdAt;
  }
}
