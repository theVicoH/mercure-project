// import ConversationListSideBar from '@/features/conversation/conversationListSideBar';
import AddFriend from '@/features/friend/addFriend';
import MessageFeed from '@/features/messages/messageFeed';
import SendMessage from '@/features/messages/sendMessage';
import UserInfo from '@/features/user/userInfo';

const ChatPage = () => {
  return (
    <div className="flex h-screen ">
      <div className="w-80 bg-gray-800">
        <UserInfo/>
        <AddFriend/>
        {/* <ConversationListSideBar/> */}
      </div>
      <div className="flex-1 p-4">
        <MessageFeed />
        <SendMessage />
      </div>
    </div>
  );
};

export default ChatPage;
