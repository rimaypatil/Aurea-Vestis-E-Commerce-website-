import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

import ProfileDropdown from './ProfileDropdown';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { openAuthModal, isAuthenticated } = useAuth();
    const { cartCount, wishlistCount } = useShop();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setIsMobileMenuOpen(false); // Close mobile menu if open
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAuthAction = (path) => {
        if (!isAuthenticated) {
            openAuthModal();
        } else {
            navigate(path);
        }
    };

    // Text color logic: White when scrolled, Charcoal when transparent/top
    const linkColorClass = isScrolled ? 'text-white' : 'text-brand-charcoal';
    const iconColorClass = 'text-white';

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-sm py-3' : 'bg-transparent py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
                {/* Logo */}
                <div className="flex items-center">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden mr-4">
                        <Menu className={`w-6 h-6 ${iconColorClass}`} />
                    </button>
                    <Link to="/home" className="font-heading font-bold text-2xl tracking-tight text-shiny-gold">
                        AUREA VESTIS
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                    <a href="/" className={`text-sm font-medium transition-colors hover:text-brand-accent ${linkColorClass}`}>Home</a>
                    <a href="/home/men" className={`text-sm font-medium transition-colors hover:text-brand-accent ${linkColorClass}`}>Men</a>
                    <a href="/home/women" className={`text-sm font-medium transition-colors hover:text-brand-accent ${linkColorClass}`}>Women</a>
                    <a href="/home/sneakers" className={`text-sm font-medium transition-colors hover:text-brand-accent ${linkColorClass}`}>Sneakers</a>
                    <a href="/home/accessories" className={`text-sm font-medium transition-colors hover:text-brand-accent ${linkColorClass}`}>Accessories</a>
                    <a href="/home/new" className={`text-sm font-medium transition-colors hover:text-brand-accent ${linkColorClass}`}>New</a>
                    <a href="/home/sale" className="text-sm font-medium transition-colors hover:text-brand-accent text-red-600 font-bold">Sale</a>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-5">
                    <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-1 focus-within:ring-brand-charcoal transition-all">
                        <Search className="w-4 h-4 text-gray-500 mr-2 cursor-pointer" onClick={() => handleSearch()} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm w-24 focus:w-48 transition-all duration-300 placeholder-gray-400 text-brand-charcoal"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>

                    <div className="relative">
                        <button
                            className={`${iconColorClass} hover:text-brand-accent transition-colors flex items-center`}
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <User className="w-5 h-5" />
                        </button>
                        <ProfileDropdown
                            isOpen={isProfileOpen}
                            onClose={() => setIsProfileOpen(false)}
                        />
                    </div>
                    <button
                        onClick={() => handleAuthAction('/wishlist')}
                        className={`${iconColorClass} hover:text-brand-accent transition-colors relative`}
                    >
                        <Heart className="w-5 h-5" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-accent rounded-full"></span>
                        )}
                    </button>
                    <button
                        onClick={() => handleAuthAction('/cart')}
                        className={`${iconColorClass} hover:text-brand-accent transition-colors relative`}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-gray-100">
                                <span className="font-heading font-bold text-2xl text-brand-charcoal">Menu</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-6 px-6">
                                <div className="space-y-6 flex flex-col">
                                    {[
                                        { label: 'New Arrivals', href: '/home/new' },
                                        { label: 'Men', href: '/home/men' },
                                        { label: 'Women', href: '/home/women' },
                                        { label: 'Sneakers', href: '/home/sneakers' },
                                        { label: 'Accessories', href: '/home/accessories' },
                                        { label: 'Sale', href: '/home/sale', isRed: true }
                                    ].map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`text-2xl font-bold tracking-tight py-2 border-b border-gray-50 hover:border-gray-200 transition-all ml-2 ${item.isRed ? 'text-red-600' : 'text-brand-charcoal'}`}
                                        >
                                            {item.label}
                                        </a>
                                    ))}

                                    <div className="pt-6">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account</h4>
                                        <button
                                            onClick={() => { setIsMobileMenuOpen(false); if (!isAuthenticated) openAuthModal(); else navigate('/profile'); }}
                                            className="block text-lg font-medium text-gray-600 hover:text-brand-charcoal py-2"
                                        >
                                            {isAuthenticated ? 'My Profile' : 'Sign In / Register'}
                                        </button>
                                        <Link
                                            to="/home/trackOrder"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block text-lg font-medium text-gray-600 hover:text-brand-charcoal py-2"
                                        >
                                            Track Order
                                        </Link>
                                        <Link
                                            to="/contact"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block text-lg font-medium text-gray-600 hover:text-brand-charcoal py-2"
                                        >
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <p className="text-xs text-center text-gray-400 font-medium">© 2025 Aurea Vestis</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
