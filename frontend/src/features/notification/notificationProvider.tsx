// NotificationProvider.tsx
import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import Notification from '@/components/ui/notification';
import { clearNotification } from '@/stores/slice/notif';

interface Props {
  children : React.ReactNode
}

const NotificationProvider: React.FC<Props> = ({ children }) => {
  const username = useSelector((state: RootState) => state.showNotif.username);
  const message = useSelector((state: RootState) => state.showNotif.message);
  const photo = useSelector((state: RootState) => state.showNotif.photo);
  const [photoNotif, setPhotoNotif] = useState("")
  const dispatch = useDispatch();
  useEffect(()=>{
    if(photo){
      const imageData = photo.data;
      const base64String = btoa(
        new Uint8Array(imageData).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      setPhotoNotif(base64String)
    }

  }, [photo])

  if(photoNotif){
    return (
      <>
        <div className='fixe h-0 z-20'>
          <AnimatePresence>
            {username && message && (
              <Notification message={message} username={username} photo={photoNotif} onClose={() => dispatch(clearNotification())} />
            )}
          </AnimatePresence>
        </div>
        {children}
      </>
    );
  }
  return <>{children}</>
};

export default NotificationProvider;
