export interface ConversationCustomTypes {
  id: number;
  friendId: number;
  friendUsername: string;
  friendPhoto: Buffer;
  message: string;
  messageSentAt: Date;
  numberOfUnreadMessages: number;
}
