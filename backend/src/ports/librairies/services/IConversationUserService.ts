import { Transaction } from "sequelize";
import ConversationUser from "../../../entities/ConversationUserEntities";

export default interface IConversationUserService {
  createConversationUser: (conversationId: number, userId: number, transaction: Transaction) => Promise<ConversationUser>
}
