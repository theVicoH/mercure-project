import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  message: string | null;
  isError: boolean;
  onClose: () => void;
}

const Toaster: React.FC<Props> = ({ message, isError, onClose }) => {
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
      style={{ zIndex: 50 }}
    > 
      <div className={`z-40 relative w-fit top-4 left-1/2 transform -translate-x-1/2 ${isError ? "bg-red-500" : "bg-green-500"} text-white px-4 py-2 rounded-md z-40`}>
        {message}
      </div>
    </motion.div>
  );
};

export default Toaster;
