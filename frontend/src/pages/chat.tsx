import ConversationListSideBar from '@/features/conversation/conversationListSideBar';
import AddFriend from '@/features/friend/addFriend';
import MessageFeed from '@/features/messages/messageFeed';
import SendMessage from '@/features/messages/sendMessage';
import UserInfo from '@/features/user/userInfo';

const ChatPage = () => {
  return (
    <div className="flex h-screen ">
      <div className="w-80 bg-zinc-800/30 border-r border-zinc-800">
        <UserInfo/>
        <div className='p-3'>
          <AddFriend/>
          <ConversationListSideBar/>
        </div>

      </div>
      <div className="flex-1 p-3">
        <MessageFeed />
        <SendMessage />
      </div>
    </div>
  );
};

export default ChatPage;
