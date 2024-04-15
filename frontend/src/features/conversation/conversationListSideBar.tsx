import { Input } from "@/components/ui/input"
import { conversationListService } from "@/services/conversationServices";
import { setCurrentConversation } from "@/stores/slice/currentConversation";
import { RootState } from "@/stores/store";
import { useEffect } from "react";
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ConversationListSideBar = () => {
  const { id } = useParams<'id'>();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  if (!authToken) {
    throw new Error("Authentication token is missing!");
  }
  const { data, error, isLoading, isError } = useQuery('conversations-list', () => conversationListService(authToken));

  const handleConversationClick = (conversationId: number) => {
    dispatch(setCurrentConversation(conversationId));
    navigate(`/chat/${conversationId}`);
  };

  useEffect(() => {
    console.log(data)
    if (!isLoading && !isError && data && 'data' in data.body && data.body.data.length > 0 && !id) {
      const firstConversationId = data.body.data[0].id;
      navigate(`/chat/${firstConversationId}`, { replace: true });
    }
  }, [id, data, isLoading, isError, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the conversations!</div>;
  }
  return (
    <div className="text-white">
      <Input placeholder="Search conversation"/>
      {data && 'data' in data.body && data.body.data.map((conversation, index) => (
        <div key={index} onClick={() => handleConversationClick(conversation.id)}>
          <p>{conversation.friendUsername}</p>
          <p>{conversation.message}</p>
          <p>{conversation.messageSentAt}</p>
        </div>
      ))}
    </div>
  )
}

export default ConversationListSideBar

