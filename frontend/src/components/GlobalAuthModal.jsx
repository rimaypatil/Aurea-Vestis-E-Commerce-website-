import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const GlobalAuthModal = () => {
    const { isAuthModalOpen, closeAuthModal } = useAuth();

    return (
        <AuthModal
            isOpen={isAuthModalOpen}
            onClose={closeAuthModal}
        />
    );
};

export default GlobalAuthModal;
