export interface ConversationCustomTypes {
  id: number;
  friendUsername: string | null;
  message: string | null;
  messageSentAt: Date | null;
  lastMessageRead: string | null;
}
