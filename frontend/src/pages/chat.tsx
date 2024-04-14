import ConversationListSideBar from '@/features/conversation/conversationListSideBar';
import ChatLayouts from '@/layouts/chatLayouts';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { id } = useParams<'id'>();
  return (
    <ChatLayouts sideBar={<ConversationListSideBar/>} chat={<>Hello</>} />
  );
};

export default ChatPage;
