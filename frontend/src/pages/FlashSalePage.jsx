import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Zap, Flame, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Flash Sale Data (Lowest Prices)
const flashProducts = [
    { id: 101, brand: "Aurea Vestis", name: "Essential Tee", price: "₹299", originalPrice: "₹999", discount: "70% OFF", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", stock: 15 },
    { id: 102, brand: "Street Soul", name: "Canvas Totebag", price: "₹199", originalPrice: "₹799", discount: "75% OFF", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop", stock: 8 },
    { id: 103, brand: "Urban Kicks", name: "Slide Sandals", price: "₹349", originalPrice: "₹1,299", discount: "73% OFF", image: "https://images.unsplash.com/photo-1603487742131-4160d6986ba2?q=80&w=800&auto=format&fit=crop", stock: 45 },
    { id: 104, brand: "Accessory Lab", name: "Beanie Cap", price: "₹149", originalPrice: "₹599", discount: "75% OFF", image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800&auto=format&fit=crop", stock: 12 },
    { id: 105, brand: "Gym Pro", name: "Water Bottle", price: "₹99", originalPrice: "₹499", discount: "80% OFF", image: "https://images.unsplash.com/photo-1602143407151-cd111bb606e4?q=80&w=800&auto=format&fit=crop", stock: 5 },
    { id: 106, brand: "Tech Style", name: "Phone Case", price: "₹199", originalPrice: "₹899", discount: "78% OFF", image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=800&auto=format&fit=crop", stock: 92 },
    { id: 107, brand: "Cozy Home", name: "Scented Candle", price: "₹249", originalPrice: "₹999", discount: "75% OFF", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop", stock: 22 },
    { id: 108, brand: "Retro Vibe", name: "Sunglasses", price: "₹299", originalPrice: "₹1,499", discount: "80% OFF", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop", stock: 3 },
];

export default function FlashSalePage() {
    // Countdown Logic (3 hours left hardcoded for urgency effect)
    const [time, setTime] = useState({ h: 2, m: 59, s: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => {
                if (prev.s > 0) return { ...prev, s: prev.s - 1 };
                if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 };
                if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            {/* Header / Nav */}
            <div className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur z-40 border-b border-white/10 py-4">
                <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center gap-2">
                    <Link to="/home/sale" className="text-gray-400 hover:text-white flex items-center gap-1 md:gap-2 text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors shrink-0">
                        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> Back to Sale
                    </Link>
                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                        <span className="text-yellow-400 font-bold uppercase tracking-widest text-[10px] md:text-xs lg:text-sm animate-pulse whitespace-nowrap hidden sm:inline-block">Ending Soon</span>
                        <div className="flex gap-1 md:gap-2 font-mono font-black text-lg md:text-2xl">
                            <span className="bg-white/10 px-1.5 md:px-2 rounded text-white">{String(time.h).padStart(2, '0')}</span>:
                            <span className="bg-white/10 px-1.5 md:px-2 rounded text-white">{String(time.m).padStart(2, '0')}</span>:
                            <span className="bg-red-600 px-1.5 md:px-2 rounded text-white">{String(time.s).padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
                {/* Hero Banner */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 p-8 md:p-16 text-center mb-12 shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 text-black bg-yellow-400 px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest mb-6 transform -rotate-2">
                            <Zap className="w-4 h-4 fill-black" /> Flash Sale
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black font-heading uppercase italic tracking-tighter mb-4 drop-shadow-xl">
                            Steal Deals
                        </h1>
                        <p className="text-xl md:text-2xl font-bold max-w-2xl mx-auto opacity-90 mb-8">
                            Prices so low, they'll be gone in seconds. Grab them before stock runs out!
                        </p>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {flashProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-gray-900 rounded-xl overflow-hidden group hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all border border-gray-800 hover:border-yellow-400"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" />
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider skew-x-[-10deg]">
                                    {product.discount}
                                </div>
                                {product.stock < 10 && (
                                    <div className="absolute bottom-2 right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1">
                                        <Flame className="w-3 h-3 fill-red-600 text-red-600" /> Only {product.stock} Left
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-300 text-sm truncate pr-2">{product.name}</h3>
                                    <span className="text-yellow-400 font-bold text-lg">{product.price}</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-1.5 mb-4 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-red-500 to-yellow-500 h-full rounded-full"
                                        style={{ width: `${100 - (product.stock * 5)}%` }} // Fake progress
                                    ></div>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-500 mb-4 font-mono">
                                    <span className="line-through">{product.originalPrice}</span>
                                    <span className="text-red-500 font-bold">{Math.floor(Math.random() * 20) + 5} sold in last hour</span>
                                </div>
                                <button className="w-full bg-white text-black font-black py-3 rounded uppercase tracking-widest text-xs hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
                                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
