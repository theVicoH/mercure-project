export interface ConversationCustomTypes {
  id: number;
  friendUsername: string;
  friendPhoto: Buffer;
  message: string;
  messageSentAt: Date;
  lastMessageRead: string;
}
