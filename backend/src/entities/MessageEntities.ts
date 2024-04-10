export class Message {
  public id: number;
  public conversationId: number;
  public senderId: number;
  public message: string;
  public read: boolean;
  public createdAt: Date;

  constructor(
    id: number,
    conversationId: number,
    senderId: number,
    message: string,
    read: boolean,
    createdAt: Date
  ) {
    this.id = id;
    this.conversationId = conversationId;
    this.senderId = senderId;
    this.message = message;
    this.read = read;
    this.createdAt = createdAt;
  }
}
