import { useParams } from 'react-router-dom';

const ConversationPage = () => {
  const { id } = useParams<'id'>();

  return <div>Conversation Page, ID: {id}</div>;
};

export default ConversationPage;
