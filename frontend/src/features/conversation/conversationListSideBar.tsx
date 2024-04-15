import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input"
import { conversationListService } from "@/services/conversationServices";
import { setCurrentConversation } from "@/stores/slice/currentConversation";
import { RootState } from "@/stores/store";
import { useEffect } from "react";
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConversationListSideBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authToken = useSelector((state: RootState) => state.auth.jwt);

  const { data, error, isLoading, isError } = useQuery('conversations-list', () => conversationListService(authToken!));

  const handleConversationClick = (conversationId: number) => {
    dispatch(setCurrentConversation(conversationId));
  };

  useEffect(() => {
    if (!isLoading && !isError && data && 'data' in data.body && data.body.data.length > 0) {
      const firstConversationId = data.body.data[0].id;
      dispatch(setCurrentConversation(firstConversationId));
      navigate("/chat");
    }
  }, [data, isLoading, isError, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the conversations!</div>;
  }
  return (
    <div className="text-white">
      <Input placeholder="Search conversation"/>
      {data && 'data' in data.body && data.body.data.map((conversation, index) => {
        const imageData = conversation.friendPhoto.data;
        const base64String = btoa(
          new Uint8Array(imageData).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        return (<div key={index} onClick={() => handleConversationClick(conversation.id)}>
          <p>{conversation.friendUsername}</p>
          <p>{conversation.message}</p>
          <p>{conversation.messageSentAt}</p>
          <Avatar>
            <AvatarImage src={`data:image/png;base64,${base64String}`} />
            <AvatarFallback>{conversation.friendUsername}</AvatarFallback>
          </Avatar>
        </div>
      )})}
    </div>
  )
}

export default ConversationListSideBar

