// import { arrayBuffer } from "@/lib/utils";
import { userInfoService } from "@/services/userServices";
import { RootState } from "@/stores/store";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const authToken = useSelector((state: RootState) => state.auth.jwt);
  if (!authToken) {
    throw new Error("Authentication token is missing!");
  }

  
  const { data, error, isLoading } = useQuery('user-info', () => userInfoService(authToken));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading the user info!</div>;
  }

  if(data){
    console.log(data)
  }
  return (
    <div>
      {data && 'data' in data.body && (
        <div>
          <div>{data.body.data.username}</div>
          {/* <img src={`data:image/png;base64,${arrayBuffer(data.body.data.photo.data)}`} alt="User" /> */}
          <div>{data.body.data.createdAt}</div>
        </div>

      )}
    </div>
  )
}

export default UserInfo