import { motion, AnimatePresence } from 'framer-motion';

interface CultureFactModalProps {
  open: boolean;
  onClose: () => void;
  icon: string;
  fact: string;
}

export default function CultureFactModal({ open, onClose, icon, fact }: CultureFactModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-5xl mb-4 animate-bounce-slow">{icon}</div>
            <div className="text-lg text-slate-700 text-center font-medium mb-2">{fact}</div>
            <button
              className="mt-4 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow hover:from-indigo-600 hover:to-purple-700 transition-all"
              onClick={onClose}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
