import ConversationListSideBar from '@/features/conversation/conversationListSideBar';
import AddFriend from '@/features/friend/addFriend';
import MessageFeed from '@/features/messages/messageFeed';
import SendMessage from '@/features/messages/sendMessage';
import UserInfo from '@/features/user/userInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';

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
      <div className="flex flex-col flex-1">
        <div className='h-20 w-full bg-red-300'></div>
        <div className='flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800 py-3 px-5'>
          <MessageFeed />
        </div>
        <SendMessage />
      </div>
    </div>
  );
};

export default ChatPage;
