import ConversationListSideBar from '@/features/conversation/conversationListSideBar';
import MessageFeed from '@/features/messages/messageFeed';
import SendMessage from '@/features/messages/sendMessage';
import UserInfo from '@/features/user/userInfo';

const ChatPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-80 bg-gray-800 text-white">
        <UserInfo/>
        <ConversationListSideBar/>
      </div>
      <div className="flex-1 p-4">
        <MessageFeed />
        <SendMessage />
      </div>
    </div>
  );
};

export default ChatPage;
