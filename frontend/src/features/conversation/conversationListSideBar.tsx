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
  const currentConversation = useSelector((state: RootState) => state.currentConversation.conversationId);

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
    <div className="text-white flex flex-col gap-5">
      <Input placeholder="Search conversation"/>
      <div className="flex flex-col">
        {data && 'data' in data.body && data.body.data.map((conversation, index) => {
          const imageData = conversation.friendPhoto.data;
          const base64String = btoa(
            new Uint8Array(imageData).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          return (
            <div className={`flex gap-3 px-3 py-3 border-b border-neutral-700 last:border-0 ${currentConversation === conversation.id && "bg-blue-600 rounded-lg border-b-0"}`} key={index} onClick={() => handleConversationClick(conversation.id)}>
              <Avatar>
                <AvatarImage src={`data:image/png;base64,${base64String}`} />
                <AvatarFallback>{conversation.friendUsername}</AvatarFallback>
              </Avatar>
              <div>
                <h6 className="text-md font-semibold max-w-fit">{conversation.friendUsername}</h6>
                <p className={`text-sm text-zinc-500 max-w-[211px] truncate ... ${currentConversation === conversation.id && "text-blue-200"}`}>{conversation.message ? conversation.message : 'No messages'}</p>
              </div>
  
            </div>
        )})}
      </div>
      
    </div>
  )
}

export default ConversationListSideBar

