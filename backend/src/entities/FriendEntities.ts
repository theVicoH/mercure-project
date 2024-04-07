export class Friend {

  public userId: number;
  public friendId: number;
  public createdAt: Date;

  constructor(userId: number, friendId: number, createdAt: Date) {
    this.userId = userId;
    this.friendId = friendId;
    this.createdAt = createdAt;
  }
}
