// import { arrayBuffer } from "@/lib/utils";
import { userInfoService } from "@/services/userServices";
import { RootState } from "@/stores/store";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  const { data, error, isLoading } = useQuery('user-info', () => userInfoService(authToken!));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the user info!</div>;
  }

  if (data && 'data' in data.body) {
    const imageData = data.body.data.photo.data;
    const base64String = btoa(
      new Uint8Array(imageData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );

    return (
      <div>
        <div>{data.body.data.username}</div>
        {data.body.data.photo && (
          <img src={`data:image/png;base64,${base64String}`} alt="User" />
        )}
        <div>{data.body.data.createdAt}</div>
      </div>
    );
  }

  return null;

}

export default UserInfo