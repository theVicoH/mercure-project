import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userInfoService } from "@/services/userServices";
import { setUserId } from "@/stores/slice/userId";
import { RootState } from "@/stores/store";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

const UserInfo = () => {
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery('user-info', () => userInfoService(authToken!));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the user info!</div>;
  }

  if (data && 'data' in data.body) {
    dispatch(setUserId({ id: data.body.data.id }))
    const imageData = data.body.data.photo.data;
    const base64String = btoa(
      new Uint8Array(imageData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    const formattedDate = new Date(data.body.data.createdAt).toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="flex flex-row gap-4 items-center py-5 text-white ">
        {data.body.data.photo && (
          <Avatar>
            <AvatarImage src={`data:image/png;base64,${base64String}`} />
            <AvatarFallback>{data.body.data.username}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{data.body.data.username}</h4>
          <span className="text-zinc-400 text-sm">{formattedDate}</span>
        </div>

      </div>
    );
  }

  return null;

}

export default UserInfo