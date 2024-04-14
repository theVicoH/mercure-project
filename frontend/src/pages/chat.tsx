import ConversationListSideBar from '@/features/conversation/conversationListSideBar';
import MessageFeed from '@/features/messages/messageFeed';
import ChatLayouts from '@/layouts/chatLayouts';

const ChatPage = () => {
  return (
    <ChatLayouts sideBar={<ConversationListSideBar/>} chat={<MessageFeed />} />
  );
};

export default ChatPage;
