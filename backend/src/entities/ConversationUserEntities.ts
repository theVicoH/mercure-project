class ConversationUser {
  conversationId: number;
  userId: number;

  constructor(conversationId: number, userId: number) {
    this.conversationId = conversationId;
    this.userId = userId;
  }
}

export default ConversationUser;
