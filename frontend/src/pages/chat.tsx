import ConversationListSideBar from '@/features/conversation/conversationListSideBar';
import ChatLayouts from '@/layouts/chatLayouts';

const ChatPage = () => {
  return (
    <ChatLayouts sideBar={<ConversationListSideBar/>} chat={<>Hello</>} />
  );
};

export default ChatPage;
