import ChatLayouts from '@/layouts/chatLayouts';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { id } = useParams<'id'>();
  return (
    <ChatLayouts sideBar={<>Conversation Page, ID: {id}</>} chat={<>Hello</>} />
  );
};

export default ChatPage;
