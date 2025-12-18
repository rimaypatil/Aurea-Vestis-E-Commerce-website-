import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FooterSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-800 md:border-none pb-4 md:pb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-2 md:py-0 md:cursor-default"
            >
                <h4 className="font-bold text-[#D4AF37] mb-0 md:mb-6">{title}</h4>
                <ChevronDown className={`w-4 h-4 text-gray-500 md:hidden transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`hidden md:block`}>
                {children}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="pt-2">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Footer() {
    return (
        <footer className="bg-black pt-16 pb-8 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                    {/* Brand - Always Visible */}
                    <div className="border-b border-gray-800 md:border-none pb-8 md:pb-0">
                        <Link to="/" className="font-heading font-bold text-2xl tracking-tight text-[#D4AF37] block mb-6">
                            AUREA VESTIS
                        </Link>
                        <p className="text-gray-300 text-sm mb-6">
                            Redefining modern Indian fashion with global aesthetics. Quality, comfort, and style in every stitch.
                        </p>
                        <div className="flex gap-6">
                            {[
                                { Icon: Instagram, link: "https://www.instagram.com/" },
                                { Icon: Twitter, link: "https://twitter.com/" },
                                { Icon: Facebook, link: "https://facebook.com/" },
                                { Icon: Youtube, link: "https://youtube.com/" }
                            ].map(({ Icon, link }, i) => (
                                <a
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-[#D4AF37] transition-colors p-2 -m-2" // increased touch target
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <FooterSection title="Shop">
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link to="/men" className="hover:text-[#D4AF37] transition-colors block py-1">Men</Link></li>
                            <li><Link to="/women" className="hover:text-[#D4AF37] transition-colors block py-1">Women</Link></li>
                            <li><Link to="/sneakers" className="hover:text-[#D4AF37] transition-colors block py-1">Sneakers</Link></li>
                            <li><Link to="/new-arrivals" className="hover:text-[#D4AF37] transition-colors block py-1">New Arrivals</Link></li>
                        </ul>
                    </FooterSection>

                    <FooterSection title="Help">
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link to="/home/trackOrder" className="hover:text-[#D4AF37] transition-colors block py-1">Track Order</Link></li>
                            <li><Link to="/home/returns-exchanges" className="hover:text-[#D4AF37] transition-colors block py-1">Returns & Exchanges</Link></li>
                            <li><Link to="/home/shippingpolicy" className="hover:text-[#D4AF37] transition-colors block py-1">Shipping Policy</Link></li>
                            <li><Link to="/home/FAQ" className="hover:text-[#D4AF37] transition-colors block py-1">FAQs</Link></li>
                        </ul>
                    </FooterSection>

                    <FooterSection title="Company">
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link to="/home/aboutus" className="hover:text-[#D4AF37] transition-colors block py-1">About Us</Link></li>
                            <li><Link to="/home/career" className="hover:text-[#D4AF37] transition-colors block py-1">Careers</Link></li>
                            <li><Link to="/stores" className="hover:text-[#D4AF37] transition-colors block py-1">Stores Near Me</Link></li>
                            <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors block py-1">Contact Us</Link></li>
                        </ul>
                    </FooterSection>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 text-center md:text-left">
                    <p className="mb-2 md:mb-0">&copy; 2025 Aurea Vestis. All rights reserved.</p>
                    <p>Designed for Trend Hunters</p>
                </div>
            </div>
        </footer>
    );
}
