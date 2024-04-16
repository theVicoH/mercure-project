import { Button } from '@/components/ui/button';
import { removeJwtToken } from '@/stores/slice/auth';
import { clearCurrentConversation } from '@/stores/slice/currentConversation';
import { clearUserId } from '@/stores/slice/userId';
import { RoutesPath } from '@/types/routes';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const UserProfil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={()=>{
        dispatch(removeJwtToken())
        dispatch(clearUserId())
        dispatch(clearCurrentConversation())
        navigate(RoutesPath.Login)
      }}>Deco</Button>
    </div>
  );
}

export default UserProfil