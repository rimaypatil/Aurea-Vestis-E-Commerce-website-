import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = false }) => {
    const containerClasses = fullScreen
        ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
        : "flex flex-col items-center justify-center py-20";

    return (
        <div className={containerClasses}>
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 border-2 border-gray-100 rounded-full"
                />

                {/* Spinning Gold Arc */}
                <motion.div
                    className="absolute inset-0 border-2 border-transparent border-t-[#D4AF37] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Spinning Ring (Counter-clockwise) */}
                <motion.div
                    className="absolute inset-4 border-2 border-transparent border-b-black rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Center Brand Initial or Dot */}
                <div className="font-heading font-bold text-xl text-[#D4AF37]">AV</div>
            </div>

            <motion.p
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="mt-6 text-sm font-medium tracking-[0.2em] text-gray-500 uppercase"
            >
                Loading
            </motion.p>
        </div>
    );
};

export default LoadingSpinner;
