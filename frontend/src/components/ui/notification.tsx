
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface Props {
  username: string | null;
  message: string | null;
  photo: string | null;
  onClose: () => void;
}

const Notification: React.FC<Props> = ({ message, onClose, username, photo }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.4 }}
    > 
      <div className="z-40 absolute flex gap-3 w-80 top-4 text-white p-3 rounded-xl left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-blue-300/10">
        <Avatar>
          <AvatarImage src={`data:image/png;base64,${photo}`} />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <p className='text-lg font-semibold'>{username}</p>
          <p className="text-sm font-medium leading-none">{message}</p>
        </div>
 
      </div>
    </motion.div>
  );
};

export default Notification;
