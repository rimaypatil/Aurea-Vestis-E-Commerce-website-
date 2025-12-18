import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Check, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const GiftCardPage = () => {
    const { showToast } = useToast();
    const [selectedAmount, setSelectedAmount] = useState(null);

    const giftCards = [
        {
            id: 1,
            amount: 1000,
            name: "Silver Tier",
            gradient: "bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300",
            textColor: "text-gray-800",
            borderColor: "border-gray-200"
        },
        {
            id: 2,
            amount: 2500,
            name: "Gold Tier",
            gradient: "bg-gradient-to-br from-yellow-600 via-yellow-300 to-yellow-600",
            textColor: "text-yellow-900",
            borderColor: "border-yellow-400"
        },
        {
            id: 3,
            amount: 5000,
            name: "Platinum Tier",
            gradient: "bg-gradient-to-br from-gray-900 via-gray-700 to-black",
            textColor: "text-white",
            borderColor: "border-gray-600"
        },
        {
            id: 4,
            amount: 10000,
            name: "Diamond Tier",
            gradient: "bg-gradient-to-br from-indigo-900 via-purple-900 to-black",
            textColor: "text-white",
            borderColor: "border-indigo-400"
        }
    ];

    const handleBuy = (amount) => {
        showToast(`₹${amount} Gift Card added to cart`, 'success');
        // Logic to add to cart would go here
    };

    return (
        <div className="min-h-screen bg-brand-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-2 block">The Perfect Gift</span>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">Give the Gift of Luxury</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                            Not sure what to choose? Let them decide with an Aurea Vestis Gift Card.
                            Valid on all collections and never expires.
                        </p>
                    </motion.div>
                </div>

                {/* Gift Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {giftCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col"
                        >
                            {/* Card Visual */}
                            <div className={`aspect-video rounded-xl ${card.gradient} mb-6 relative overflow-hidden shadow-inner border ${card.borderColor} group cursor-pointer`}>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
                                <div className="absolute top-4 right-4 animate-pulse">
                                    <Gift className={`w-6 h-6 ${card.amount > 2500 ? 'text-white' : 'text-gray-800'}`} />
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <p className={`font-heading font-bold text-xl ${card.textColor}`}>{card.name}</p>
                                    <p className={`font-mono text-sm opacity-80 ${card.textColor}`}>★★★★ 88XX</p>
                                </div>
                                <div className="absolute bottom-4 right-4">
                                    <p className={`font-bold text-lg ${card.textColor}`}>₹{card.amount.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check size={16} className="text-green-500" /> No Expiry Date
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check size={16} className="text-green-500" /> Instant Email Delivery
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check size={16} className="text-green-500" /> Valid on Sale Items
                                </li>
                            </ul>

                            {/* Action */}
                            <button
                                onClick={() => handleBuy(card.amount)}
                                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                Buy for ₹{card.amount.toLocaleString()}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Info Section */}
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
                    <ShieldCheck size={48} className="mx-auto text-brand-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Secure & Instant</h3>
                    <p className="text-gray-600 max-w-xl mx-auto mb-8">
                        Our digital gift cards are delivered instantly to your inbox via email.
                        They utilize secure encryption and can be easily redeemed at checkout.
                    </p>
                    <div className="flex justify-center gap-4 text-sm font-medium text-gray-500">
                        <span>Apple Wallet Compatible</span> •
                        <span>Printable PDF</span> •
                        <span>Balance Protection</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCardPage;
