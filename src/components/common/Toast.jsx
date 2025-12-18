import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export default function Toast({ message, type = 'success', isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const variants = {
        hidden: { y: 100, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 }
    };

    const bgColors = {
        success: 'bg-brand-charcoal',
        error: 'bg-red-600',
        info: 'bg-blue-600'
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-brand-accent" />,
        error: <XCircle className="w-5 h-5 text-white" />,
        info: <Info className="w-5 h-5 text-white" />
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`${bgColors[type]} text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-[300px] hover:scale-105 transition-transform cursor-pointer`}
                        onClick={onClose}
                    >
                        {icons[type]}
                        <span className="font-medium text-sm tracking-wide">{message}</span>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
