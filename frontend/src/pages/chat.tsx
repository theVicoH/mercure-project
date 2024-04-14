import ConversationListSideBar from '@/features/conversation/conversationListSideBar';
import MessageFeed from '@/features/messages/messageFeed';
import SendMessage from '@/features/messages/sendMessage';

const ChatPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-80 bg-gray-800 text-white">
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
