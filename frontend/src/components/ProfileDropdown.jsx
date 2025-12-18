import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Package, Heart, Gift, HelpCircle,
    LogOut, Settings, MapPin, Tag, LogIn
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileDropdown = ({ isOpen, onClose }) => {
    const dropdownRef = useRef(null);
    const { user, isAuthenticated, logout, openAuthModal } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Handle Escape key
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleAuthClick = () => {
        openAuthModal();
        onClose();
    };

    const handleLogout = () => {
        logout();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Mobile Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        onClick={onClose}
                    />

                    <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="
                            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm 
                            lg:absolute lg:top-12 lg:right-0 lg:left-auto lg:translate-x-0 lg:translate-y-0 lg:w-80
                            bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-center lg:origin-top-right
                        "
                    >
                        {/* Header Section */}
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            {isAuthenticated ? (
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-gray-100 p-0.5">
                                        {user?.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <div className="w-full h-full bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                                {user?.name?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold font-outfit text-gray-900">
                                        Hi, {user?.name || 'User'}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">{user?.email || user?.phone}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm text-red-600 font-medium hover:underline flex items-center justify-center gap-1"
                                    >
                                        <LogOut size={14} /> Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <h3 className="text-xl font-bold font-outfit text-gray-900 mb-1">Welcome</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        To access your account and manage orders
                                    </p>
                                    <button
                                        onClick={handleAuthClick}
                                        className="w-full bg-black text-white font-medium py-3 rounded-xl hover:bg-gray-900 transition-colors uppercase tracking-wide text-sm flex items-center justify-center gap-2"
                                    >
                                        Login / Sign Up
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Quick Links */}
                        <div className="p-2 overflow-y-auto max-h-[40vh] lg:max-h-none">
                            <Link to={isAuthenticated ? "/orders" : "#"} onClick={isAuthenticated ? onClose : handleAuthClick} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                                <div className={`p-2 rounded-lg ${isAuthenticated ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <Package size={20} />
                                </div>
                                <div>
                                    <h4 className={`font-medium ${isAuthenticated ? 'text-gray-900' : 'text-gray-400'}`}>Orders</h4>
                                    <p className="text-xs text-gray-400">Check your order status</p>
                                </div>
                            </Link>

                            <Link to={isAuthenticated ? "/wishlist" : "#"} onClick={isAuthenticated ? onClose : handleAuthClick} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                                <div className={`p-2 rounded-lg ${isAuthenticated ? 'bg-pink-50 text-pink-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <Heart size={20} />
                                </div>
                                <div>
                                    <h4 className={`font-medium ${isAuthenticated ? 'text-gray-900' : 'text-gray-400'}`}>Wishlist</h4>
                                    <p className="text-xs text-gray-400">Your favorite items</p>
                                </div>
                            </Link>

                            <Link to="/gift-cards" onClick={onClose} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                                <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                                    <Gift size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Gift Cards</h4>
                                    <p className="text-xs text-gray-400">Redeem or buy gift cards</p>
                                </div>
                            </Link>

                            <Link to="/contact" onClick={onClose} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                                <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                                    <HelpCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900">Contact Us</h4>
                                    <p className="text-xs text-gray-400">Help & Support</p>
                                </div>
                            </Link>
                        </div>

                        <div className="h-px bg-gray-100 mx-4" />

                        {/* Footer Links */}
                        <div className="p-2 mb-2">
                            <Link to="/coupons" onClick={onClose} className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left group">
                                <Tag size={18} className="text-gray-400 group-hover:text-brand-primary transition-colors" />
                                <div>
                                    <h4 className="font-medium text-gray-900 text-sm">Coupons</h4>
                                    <p className="text-xs text-gray-400">Available offers</p>
                                </div>
                            </Link>
                            <Link to={isAuthenticated ? "/saved-addresses" : "#"} onClick={isAuthenticated ? onClose : handleAuthClick} className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left group">
                                <MapPin size={18} className="text-gray-400 group-hover:text-brand-primary transition-colors" />
                                <div>
                                    <h4 className={`font-medium text-sm ${isAuthenticated ? 'text-gray-900' : 'text-gray-400'}`}>Saved Addresses</h4>
                                    <p className="text-xs text-gray-400">Manage your locations</p>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProfileDropdown;
