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
    > 
      <div className={`z-40 absolute w-fit top-4 text-white p-3 rounded-lg left-1/2 transform -translate-x-1/2 backdrop-blur-xl border ${isError ? "bg-red-500/40 border-red-800" : "bg-green-500/40 border-green-800"} `}>
        {message}
      </div>
    </motion.div>
  );
};

export default Toaster;
