import React from 'react';
import { Tag, Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';

const coupons = [
    {
        code: 'WELCOME10',
        discount: '10% OFF',
        description: 'Get 10% off on your first order. Minimum purchase ₹1000.',
        color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
        textColor: 'text-purple-600'
    },
    {
        code: 'SUMMER20',
        discount: '20% OFF',
        description: 'Summer Sale Extravaganza! Flat 20% off on all clothing.',
        color: 'bg-gradient-to-r from-orange-400 to-red-500',
        textColor: 'text-orange-500'
    },
    {
        code: 'FREESHIP',
        discount: 'Free Shipping',
        description: 'Free shipping on all orders above ₹2000.',
        color: 'bg-gradient-to-r from-green-400 to-teal-500',
        textColor: 'text-green-600'
    },
    {
        code: 'AUREA500',
        discount: '₹500 OFF',
        description: 'Flat ₹500 off on premium sneakers collection.',
        color: 'bg-gradient-to-r from-gray-800 to-black',
        textColor: 'text-gray-800'
    }
];

const CouponsPage = () => {
    const { showToast } = useToast();
    const [copiedCode, setCopiedCode] = React.useState(null);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        showToast(`Coupon ${code} copied!`, 'success');
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const [email, setEmail] = React.useState('');

    const handleSubscribe = () => {
        if (!email) {
            showToast('Please enter your email address', 'error');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        showToast('Subscribed successfully!', 'success');
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Exclusive Offers</h1>
                    <p className="text-lg text-gray-600">Save more on your favorite styles with these curated coupons.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {coupons.map((coupon, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow relative"
                        >
                            {/* Decorative Left Border */}
                            <div className={`absolute left-0 top-0 bottom-0 w-2 ${coupon.color}`}></div>

                            <div className="p-6 pl-8 flex justify-between items-center">
                                <div className="flex-1 pr-4">
                                    <h3 className={`text-2xl font-bold font-heading mb-1 ${coupon.textColor}`}>{coupon.discount}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{coupon.description}</p>

                                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-100 border-dashed w-fit">
                                        <Tag size={16} className="text-gray-400" />
                                        <span className="font-mono font-bold text-gray-800 tracking-wider">{coupon.code}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleCopy(coupon.code)}
                                    className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 hover:text-brand-primary"
                                    title="Copy Code"
                                >
                                    {copiedCode === coupon.code ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                                </button>
                            </div>

                            {/* Circle Cutouts for Ticket Effect */}
                            <div className="absolute -left-3 top-1/2 w-6 h-6 bg-gray-50 rounded-full"></div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 bg-brand-ivory rounded-xl p-8 text-center border border-brand-primary/20">
                    <h3 className="text-xl font-bold text-brand-charcoal mb-2">Want more offers?</h3>
                    <p className="text-brand-gray mb-6">Subscribe to our newsletter to get exclusive deals delivered to your inbox.</p>
                    <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="w-full flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-brand-primary"
                        />
                        <button
                            onClick={handleSubscribe}
                            className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponsPage;
