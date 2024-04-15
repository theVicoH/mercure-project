import { useMercure } from '@/hooks/useMercure';
import { isSuccessResponse } from '@/lib/utils';
import { messageFeedService } from '@/services/messagesServices';
import { RootState } from '@/stores/store';
import { MessageResponse } from '@/types/response';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

const MessageFeed = () => {
  // const { id } = useParams<'id'>();
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  const id = useSelector((state: RootState) => state.currentConversation.conversationId);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const newMessage = useMercure(`/conversations/${id}`)

  const { error, isLoading } = useQuery(['message-feed', id], () => messageFeedService(authToken!, id!), {
    enabled: !!id,
    onSuccess: (response) => {
      if (isSuccessResponse<MessageResponse[]>(response)) {
        setMessages(response.body.data);
      }
    }
  });
  
  useEffect(() => {
    if (newMessage) {
      setMessages(currentMessages => [...currentMessages, newMessage]);
    }
  }, [newMessage]);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the conversations!</div>;
  }

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.id}</p>
          <p>{message.conversationId}</p>
          <p>{message.senderId}</p>
          <p>{message.message}</p>
          <p>{message.read ? "read" : "not read"}</p>
          <p>{message.createdAt}</p>
        </div>
      ))}
  </div>
  )
}

export default MessageFeed