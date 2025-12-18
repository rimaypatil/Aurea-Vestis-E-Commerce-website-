import { ChevronDown, Heart, Clock, Zap, CheckCircle, Filter, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SaleCategories from '../components/sale/SaleCategories';
import MarqueeSection from '../components/MarqueeSection';
import SaleFilterSidebar from '../components/sale/SaleFilterSidebar';
import JoinClub from '../components/JoinClub';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Mock Sale Data
const saleProducts = [
    { id: 1, brand: "Aurea Vestis", title: "Casual Shirt", category: "Men", price: "₹899", originalPrice: "₹1,999", discount: "55% OFF", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop" },
    { id: 2, brand: "Urban Chic", title: "Summer Dress", category: "Women", price: "₹1,299", originalPrice: "₹2,599", discount: "50% OFF", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop" },
    { id: 3, brand: "Nike", title: "Air Max Sc", category: "Sneakers", price: "₹4,495", originalPrice: "₹6,995", discount: "35% OFF", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
    { id: 4, brand: "Fossil", title: "Chronograph", category: "Accessories", price: "₹6,499", originalPrice: "₹12,999", discount: "50% OFF", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop" },
    { id: 5, brand: "Levi's", title: "511 Slim Jeans", category: "Men", price: "₹1,999", originalPrice: "₹3,999", discount: "50% OFF", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop" },
    { id: 6, brand: "Puma", title: "Running Tee", category: "Women", price: "₹699", originalPrice: "₹1,499", discount: "53% OFF", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop" },
];

export default function SalePage() {
    const { isAuthenticated, openAuthModal } = useAuth();

    // Countdown Timer logic for Daily Deals
    // Initial time: 10 hours, 45 minutes, 12 seconds
    const INITIAL_TIME = 10 * 3600 + 45 * 60 + 12;
    const [secondsLeft, setSecondsLeft] = useState(INITIAL_TIME);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 0) return INITIAL_TIME; // Reset when finished
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { hours, minutes, seconds };
    };

    const timeLeft = formatTime(secondsLeft);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="pt-0 bg-brand-white">
            {/* Hero Section */}
            <section className="relative w-full min-h-[85vh] bg-red-600 overflow-hidden flex items-center justify-center text-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop"
                        alt="Sale Hero"
                        className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-transparent to-transparent"></div>

                <div className="relative z-10 text-white max-w-5xl px-6 animate-fade-in-up mt-8 md:mt-0 pt-20">
                    <h5 className="bg-yellow-400 text-black px-6 py-2 inline-block rounded font-black text-sm mb-6 uppercase shadow-lg transform -rotate-2">Big Deals. Limited Time.</h5>
                    <h1 className="text-6xl md:text-9xl font-heading font-black mb-6 tracking-tighter shadow-sm text-white drop-shadow-2xl">MEGA SALE</h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-10 font-bold tracking-wide max-w-3xl mx-auto">Up to 70% Off Everything. Don't Miss Out.</p>
                    <button onClick={() => scrollToSection('daily-deals')} className="bg-white text-red-600 font-black px-12 py-5 rounded-full text-xl hover:bg-black hover:text-white transition-all transform hover:-translate-y-2 shadow-2xl">
                        Shop All Deals
                    </button>
                </div>
            </section>

            {/* Quick Nav */}
            <div className="sticky top-20 z-40 bg-white/95 backdrop-blur shadow-md py-4 border-b border-gray-100 hidden md:block">
                <div className="max-w-7xl mx-auto px-6 flex justify-center space-x-8">
                    {['Men Deals', 'Women Deals', 'Sneaker Deals', 'Accessories', 'Daily Deals'].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToSection(item.replace(' ', '-').toLowerCase())}
                            className="text-sm font-bold uppercase tracking-widest text-brand-charcoal hover:text-red-600 transition-colors"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Daily Deals Widget - Mobile visible mostly */}
            <section id="daily-deals" className="bg-brand-charcoal py-8 text-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
                    <div className="flex items-center gap-3">
                        <Zap className="w-8 h-8 text-yellow-400 fill-current animate-pulse" />
                        <div>
                            <h3 className="text-xl font-bold uppercase leading-none">Flash Sale</h3>
                            <p className="text-xs text-gray-400">Ends Tonight</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="bg-white/10 p-3 rounded text-center min-w-[60px]">
                            <span className="block text-2xl font-bold font-mono">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="text-[10px] uppercase text-gray-400">Hrs</span>
                        </div>
                        <span className="text-2xl font-bold">:</span>
                        <div className="bg-white/10 p-3 rounded text-center min-w-[60px]">
                            <span className="block text-2xl font-bold font-mono">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="text-[10px] uppercase text-gray-400">Min</span>
                        </div>
                        <span className="text-2xl font-bold">:</span>
                        <div className="bg-white/10 p-3 rounded text-center min-w-[60px]">
                            <span className="block text-2xl font-bold font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="text-[10px] uppercase text-gray-400">Sec</span>
                        </div>
                    </div>
                    <Link to="/sale/flash-sale" className="bg-yellow-400 text-black font-bold px-6 py-3 rounded hover:bg-white transition-colors uppercase text-xs tracking-wider inline-block">
                        Shop Now
                    </Link>
                </div>
            </section>

            <SaleCategories />

            <MarqueeSection />

            {/* Main Content Area */}
            <section className="max-w-7xl mx-auto px-6 py-12 flex">
                {/* Sidebar */}
                <SaleFilterSidebar />

                {/* Product Grid Area */}
                <div className="flex-1 lg:pl-8">
                    {/* Mobile Filter Button */}
                    <div className="lg:hidden mb-6 flex justify-end">
                        <button
                            onClick={() => setIsMobileFiltersOpen(true)}
                            className="flex items-center gap-2 text-sm font-bold text-brand-charcoal border border-gray-200 px-4 py-2 rounded hover:bg-gray-50"
                        >
                            <Filter className="w-4 h-4" /> Filters
                        </button>
                    </div>

                    {/* Sections for Categories */}

                    {/* MEN'S SALE */}
                    <div id="men-deals" className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-heading font-bold">Men's 50% Off</h3>
                            <Link to="/sale/men-50" className="text-red-500 font-bold text-sm hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {saleProducts.filter(p => p.category === 'Men').concat(saleProducts.filter(p => p.category === 'Men')).map((product, i) => ( // Duplicate for demo
                                <ProductCard key={`men-${i}`} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* WOMEN'S SALE */}
                    <div id="women-deals" className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-heading font-bold">Women's 60% Off</h3>
                            <Link to="/sale/women-60" className="text-red-500 font-bold text-sm hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {saleProducts.filter(p => p.category === 'Women').concat(saleProducts.filter(p => p.category === 'Women')).map((product, i) => (
                                <ProductCard key={`women-${i}`} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* Limited Time Offer Banner */}
                    <div className="mb-12 relative rounded-xl overflow-hidden h-64 flex items-center bg-gray-900">
                        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Flash Sale" />
                        <div className="relative z-10 px-10">
                            <h4 className="text-yellow-400 font-bold uppercase tracking-widest mb-2">48-Hour Flash Sale</h4>
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">EXTRA 20% OFF SNEAKERS</h2>
                            <button className="bg-white text-black font-bold px-8 py-3 rounded hover:bg-yellow-400 transition-colors">Code: FLASH20</button>
                        </div>
                    </div>

                    {/* SNEAKERS & ACCESSORIES SALE */}
                    <div id="sneaker-deals" className="mb-12 relative">
                        <span id="accessories" className="absolute -top-24 opacity-0 pointer-events-none"></span>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-heading font-bold">Sneakers & Accessories</h3>
                            <a href="#" className="text-red-500 font-bold text-sm hover:underline">View All</a>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {saleProducts.filter(p => p.category === 'Sneakers' || p.category === 'Accessories').concat(saleProducts.filter(p => p.category === 'Sneakers')).map((product, i) => (
                                <ProductCard key={`other-${i}`} product={product} />
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Account CTA */}
            <section className="bg-gray-50 py-16 text-center border-t border-gray-100">
                <div className="max-w-2xl mx-auto px-6">
                    {isAuthenticated ? (
                        <>
                            <div className="flex justify-center mb-6">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <CheckCircle className="w-12 h-12 text-green-600" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-heading font-bold mb-4">You've Unlocked Exclusive Pricing</h2>
                            <p className="text-gray-500 mb-8">As a member, you're seeing the best deals first. Happy Shopping!</p>
                            <button className="bg-brand-charcoal text-white px-8 py-3 rounded font-bold hover:bg-black transition-colors shadow-lg">View My Wishlist</button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-heading font-bold mb-4">Unlock Exclusive Sale Access</h2>
                            <p className="text-gray-500 mb-8">Create an account to get early access to our biggest drops and additional member-only discounts.</p>
                            <div className="flex gap-4 justify-center">
                                <button onClick={() => openAuthModal('register')} className="bg-brand-charcoal text-white px-8 py-3 rounded font-bold hover:bg-black transition-colors shadow-lg">Create Account</button>
                                <button onClick={() => openAuthModal('login')} className="bg-white text-brand-charcoal border border-gray-300 px-8 py-3 rounded font-bold hover:border-brand-charcoal transition-colors">Login</button>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl lg:hidden overflow-hidden flex flex-col"
                        >
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-heading font-bold text-lg">Filters</h3>
                                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <SaleFilterSidebar className="w-full border-none h-auto p-4" />
                            </div>
                            <div className="p-4 border-t border-gray-100 bg-gray-50">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full bg-brand-charcoal text-white py-3 rounded font-bold uppercase tracking-widest text-sm"
                                >
                                    Show Results
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

// Reusable Product Card for Sale Page
function ProductCard({ product }) {
    return (
        <div className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-red-100 hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Link to={`/product/${product._id || product.id}`}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2 py-1 uppercase tracking-wider shadow-md animate-pulse">
                    {product.discount}
                </div>
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg text-gray-400 hover:text-red-500 transition-colors opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transform translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0 duration-300 cursor-pointer">
                    <Heart className="w-4 h-4" />
                </button>
                {/* Mobile Cart Button */}
                <button className="lg:hidden absolute bottom-3 left-3 p-2 bg-white rounded-full shadow-lg text-brand-charcoal hover:bg-red-600 hover:text-white transition-colors z-10">
                    <ShoppingBag className="w-4 h-4" />
                </button>

                <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent flex-col gap-2">
                    <button className="w-full bg-white text-red-600 py-2 rounded font-bold text-sm hover:bg-red-600 hover:text-white transition-colors cursor-pointer uppercase tracking-widest">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-xs text-brand-gray font-bold uppercase tracking-wider">{product.brand}</p>
                    <p className="text-xs text-red-500 font-bold">Limited Stock</p>
                </div>
                <Link to={`/product/${product._id || product.id}`}>
                    <h3 className="font-heading font-bold text-base text-brand-charcoal mb-1 truncate hover:text-red-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <div className="flex items-center gap-2">
                    <span className="font-black text-red-600 text-lg">{product.price}</span>
                    <span className="text-sm text-gray-400 line-through font-medium">{product.originalPrice}</span>
                </div>
            </div>
        </div>
    );
}
