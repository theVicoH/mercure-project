import { messageFeedService } from '@/services/messagesServices';
import { RootState } from '@/stores/store';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MessageFeed = () => {
  const { id } = useParams<'id'>();
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  if (!authToken) {
    throw new Error("Authentication token is missing!");
  }
  if (!id) {
    throw new Error("Id params is missing!");
  }
  const { data, error, isLoading } = useQuery(['message-feed', id], () => messageFeedService(authToken, id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the conversations!</div>;
  }
  if(data){
    console.log(data)
  }

  return (
    <div>
    {data && 'data' in data.body && data.body.data.map((message, index) => (
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