export class Conversation {
  public id: number;
  public createdAt: Date;

  constructor(id: number, createdAt: Date) {
    this.id = id;
    this.createdAt = createdAt;
  }
}
