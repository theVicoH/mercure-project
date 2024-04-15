import ConversationListSideBar from '@/features/conversation/conversationListSideBar';
import AddFriend from '@/features/friend/addFriend';
import MessageFeed from '@/features/messages/messageFeed';
import SendMessage from '@/features/messages/sendMessage';
import UserInfo from '@/features/user/userInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';
import MessageHeader from '@/features/messages/messageHeader';

const ChatPage = () => {
  return (
    <div className="flex h-screen ">
      <div className="w-80 bg-zinc-800/30 border-r border-zinc-800">
        <Tabs defaultValue="conversations">
          <div className='p-3 bg-zinc-700/20 border-b border-zinc-800'>
            <UserInfo/>
            <Separator className='mb-5'/>
            <TabsList className='w-full'>
              <TabsTrigger value="conversations" className='w-full'>Conversations</TabsTrigger>
              <TabsTrigger value="addFriend" className='w-full'>Add friend</TabsTrigger>
            </TabsList>
          </div>
  
          <div className='py-3 px-3'>
            <TabsContent value="conversations"><ConversationListSideBar/></TabsContent>
            <TabsContent value="addFriend"><AddFriend/></TabsContent>
          </div>
        </Tabs>
      </div>
      <div className="flex-1 relative">
        <div className='absolute h-fit w-full px-5 py-4 bg-zinc-600/10 backdrop-blur-xl border-t border border-b border-zinc-800'>
          <MessageHeader/>
        </div>
        <div className='h-full pt-[113px] pb-[81px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800 py-3 px-5'>
          <MessageFeed />
        </div>
        <div className='absolute bottom-0 w-full'>
          <SendMessage />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
