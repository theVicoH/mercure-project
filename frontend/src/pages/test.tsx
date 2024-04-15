import { Button } from '@/components/ui/button';
import { checkAndRemoveExpiredToken, removeJwtToken } from '@/stores/slice/auth';
// import { clearUserProfil } from '@/stores/slice/userProfil';
import { RoutesPath } from '@/types/routes';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Test = () => {
  const dispatch = useDispatch();
  dispatch(checkAndRemoveExpiredToken());
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={()=>{
        dispatch(removeJwtToken())
        // dispatch(clearUserProfil())
        navigate(RoutesPath.Login)
      }}>Deco</Button>
    </div>
  );
}

export default Test