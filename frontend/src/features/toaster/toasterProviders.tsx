// NotificationProvider.tsx
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import Toaster from '@/components/ui/toaster';
import { clearToasterNotification } from '@/stores/slice/toasterNotif';

interface Props {
  children : React.ReactNode
}

const ToasterProvider: React.FC<Props> = ({ children }) => {
  const notification = useSelector((state: RootState) => state.showToaster.notification);
  const isErrorNotif = useSelector((state: RootState) => state.showToaster.isError);
  const dispatch = useDispatch();

  return (
    <>
      <div className='fixe h-0 z-20'>
        <AnimatePresence>
          {notification && (
            <Toaster message={notification} onClose={() => dispatch(clearToasterNotification())} isError={isErrorNotif}/>
          )}
        </AnimatePresence>
      </div>
      {children}
    </>
  );
};

export default ToasterProvider;
