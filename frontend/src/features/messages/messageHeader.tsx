import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const MessageHeader = () => {
  const friendUsername = useSelector((state: RootState) => state.currentConversation.friendUsername);
  const friendPhoto = useSelector((state: RootState) => state.currentConversation.friendPhoto);

  if(friendUsername && friendPhoto ){
    return (
      <div className="flex gap-3 items-center text-white">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`data:image/png;base64,${friendPhoto}`} />
          <AvatarFallback>{friendUsername}</AvatarFallback>
        </Avatar>
        <h4 className="">{friendUsername}</h4>
      </div>

    )
  }
  return
}

export default MessageHeader