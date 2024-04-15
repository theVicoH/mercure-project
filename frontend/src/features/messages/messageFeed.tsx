import { useMercure } from '@/hooks/useMercure';
import { isSuccessResponse } from '@/lib/utils';
import { messageFeedService } from '@/services/messagesServices';
import { RootState } from '@/stores/store';
import { MessageResponse } from '@/types/response';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const MessageFeed = () => {
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  const conversationId = useSelector((state: RootState) => state.currentConversation.conversationId);
  const userId = useSelector((state: RootState) => state.userId.id);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const newMessage = useMercure(`/conversations/${conversationId}`)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, error, isLoading } = useQuery(['message-feed', conversationId], () => messageFeedService(authToken!, conversationId!), {
    enabled: !!conversationId,
    onSuccess: (response) => {
      if (isSuccessResponse<MessageResponse[]>(response)) {
        setMessages(response.body.data);
      }
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    if (newMessage) {
      setMessages(currentMessages => [...currentMessages, newMessage]);
    }
  }, [newMessage]);

  const groupMessages = (messages: MessageResponse[]): Record<string, MessageResponse[]> => {
    const grouped: Record<string, MessageResponse[]> = {};
    messages.forEach(message => {
      const date = new Date(message.createdAt);
      const roundedHours = Math.floor(date.getHours() / 3) * 3;
      const dateKey = date.toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
      const key = `${dateKey.split(', ')[0]}, ${dateKey.split(', ')[1]} at ${roundedHours}:00 - ${roundedHours + 3}:00`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(message);
    });
    return grouped;
  };

  const groupedMessages = groupMessages(messages);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the conversations!</div>;
  }

  return (
    <div className="flex flex-col p-2">
      {Object.entries(groupedMessages).map(([group, messages]) => (
        <div key={group} className='flex flex-col items-center'>
          <h2 className="text-sm mb-2 text-zinc-500 mt-5">{group}</h2>
          {messages.map((message, index) => (
            <div key={index} className={`text-white my-1 ${message.senderId === userId ? 'ml-auto' : 'mr-auto'}`}>
              <div className={`flex flex-col ${message.senderId === userId ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-xs rounded-full mb-1 px-3 py-1 ${message.senderId === userId ? 'bg-blue-500' : 'bg-zinc-600/30'}`}>
                  <p className="text-md">{message.message}</p>
                </div>
                <p className={`text-xs text-zinc-500 ${message.senderId === userId ? 'pr-2' : 'pl-2'}`}>{!message.read && "unread"}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageFeed