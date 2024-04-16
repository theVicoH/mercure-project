import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input"
import { useMercure } from "@/hooks/useMercure";
import { conversationListService } from "@/services/conversationServices";
import { setCurrentConversation } from "@/stores/slice/currentConversation";
import { setNotification } from "@/stores/slice/notif";
import { RootState } from "@/stores/store";
import { ConversationListResponse } from "@/types/response";
import { Notifcation } from "@/types/types";
import { useEffect, useState } from "react";
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConversationListSideBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  const id = useSelector((state: RootState) => state.userId.id);
  const currentConversation = useSelector((state: RootState) => state.currentConversation.conversationId);

  const { data, error, isLoading, isError } = useQuery('conversations-list', () => conversationListService(authToken!));
  const [searchInput, setSearchInput] = useState("");
  const [conversations, setConversations] = useState<ConversationListResponse[]>([]);
  const notifications = useMercure<Notifcation>(`/notification/${id}`)
  const newMessage = useMercure<Notifcation>(`/conversations/${currentConversation}`)


  const handleConversationClick = (conversationId: number, friendId: number, firendUsername: string, friendPhoto: string) => {
    dispatch(setCurrentConversation({
      conversationId: conversationId,
      friendId: friendId,
      friendUsername: firendUsername,
      friendPhoto: friendPhoto
    }));
    const updatedConversations = conversations.map(conversation =>
      conversation.id === conversationId ? { ...conversation, numberOfUnreadMessages: 0 } : conversation
    );
    setConversations(updatedConversations);
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.friendUsername.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    if (notifications && notifications.conversationId) {
      dispatch(setNotification({ message: notifications.message, username: notifications.username, photo: notifications.photo}));
  
      const updatedConversations = conversations.map(conversation =>
        conversation.id === notifications.conversationId ? {
          ...conversation,
          numberOfUnreadMessages: conversation.numberOfUnreadMessages + 1
        } : conversation
      );
  
      setConversations(updatedConversations);
    }
  }, [notifications]);

  useEffect(() => {
    if (newMessage && newMessage.conversationId) {
      const updatedConversations = conversations.map(conversation =>
        conversation.id === newMessage.conversationId ? {
          ...conversation,
          numberOfUnreadMessages: conversation.numberOfUnreadMessages + 1,
          lastMessage: newMessage.message
        } : conversation
      );
  
      const conversationIndex = updatedConversations.findIndex(conversation => conversation.id === newMessage.conversationId);
      if (conversationIndex > -1) {
        const updatedConversation = updatedConversations.splice(conversationIndex, 1)[0];
        updatedConversations.unshift(updatedConversation);
      }
  
      setConversations(updatedConversations);
    }
  }, [newMessage]);

  useEffect(() => {
    if (!isLoading && !isError && data && 'data' in data.body && data.body.data.length > 0) {
      setConversations(data.body.data);
      const imageData = data.body.data[0].friendPhoto.data;
      const base64String = btoa(
        new Uint8Array(imageData).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      if(!currentConversation){
        dispatch(setCurrentConversation({
          conversationId: data.body.data[0].id,
          friendId: data.body.data[0].friendId,
          friendUsername: data.body.data[0].friendUsername,
          friendPhoto: base64String
        }));
      };

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
      <Input
        placeholder="Search conversation"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
        {filteredConversations.map((conversation, index) => {
          const imageData = conversation.friendPhoto.data;
          const base64String = btoa(
            new Uint8Array(imageData).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          const formattedDate = new Date(conversation.messageSentAt).toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          });
          return (
            <div className={`flex items-center gap-3 px-3 py-3 border-b border-neutral-700 hover:bg-zinc-800 hover:rounded-lg last:border-0 ${currentConversation === conversation.id && "bg-blue-600 rounded-lg border-b-0 hover:bg-blue-600/80"}`} key={index} onClick={() => handleConversationClick(conversation.id, conversation.friendId, conversation.friendUsername, base64String)}>
              <div className="relative">
                <Avatar>
                  <AvatarImage src={`data:image/png;base64,${base64String}`} />
                  <AvatarFallback>{conversation.friendUsername}</AvatarFallback>
                </Avatar>
                {conversation.numberOfUnreadMessages !== 0 && currentConversation !== conversation.id && (
                  <div className="absolute top-[-4px] right-[-4px] bg-blue-600 rounded-full h-6 w-6 flex justify-center items-center ">
                    <p className="text-sm">{conversation.numberOfUnreadMessages}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center w-full">
                  <h6 className="text-md font-semibold max-w-fit">{conversation.friendUsername}</h6>
                  <div className={`text-xs font-medium leading-none ${currentConversation === conversation.id ? "text-blue-100" : "text-zinc-400"}`}>{formattedDate}</div>
                </div>
                <p className={`text-sm max-w-[175px] truncate ... ${currentConversation === conversation.id ? "text-blue-100" : "text-zinc-400"}`}>{conversation.message ? conversation.message : 'No messages'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConversationListSideBar

