import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Flame, TrendingUp, ShoppingBag, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TrendingPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, openAuthModal } = useAuth();

    const handleAction = (actionName) => {
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }
        // Proceed with action (mock for now)
        console.log(`${actionName} action triggered for authenticated user`);
    };

    useEffect(() => {
        fetchTrending();
    }, []);

    const fetchTrending = async () => {
        try {
            const response = await axios.get('https://aureavestis.netlify.app/api/products/trending');
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching trending products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-16 px-6 mb-12">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
                        <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
                        <span className="text-sm font-bold uppercase tracking-wider">Hot Right Now</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 italic tracking-tighter">TRENDING NOW</h1>
                    <p className="text-xl text-purple-200 font-light tracking-wide">What everyone is wearing right now.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">

                {/* Trending Categories */}
                {/* Trending Categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {[
                        { name: 'Men', bg: 'bg-blue-50 hover:bg-blue-100', text: 'text-blue-900', icon: 'text-blue-500' },
                        { name: 'Women', bg: 'bg-green-50 hover:bg-green-100', text: 'text-green-900', icon: 'text-green-500' },
                        { name: 'Sneakers', bg: 'bg-red-50 hover:bg-red-100', text: 'text-red-900', icon: 'text-red-500' },
                        { name: 'Accessories', bg: 'bg-yellow-50 hover:bg-yellow-100', text: 'text-yellow-900', icon: 'text-yellow-600' }
                    ].map((cat) => (
                        <div key={cat.name} className={`${cat.bg} p-6 rounded-xl text-center cursor-pointer transition-colors border border-transparent group`}>
                            <TrendingUp className={`w-8 h-8 mx-auto mb-3 ${cat.icon} transition-colors`} />
                            <h3 className={`font-bold ${cat.text}`}>Trending in {cat.name}</h3>
                        </div>
                    ))}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product, idx) => (
                            <div key={product._id || product.id} className="group relative">
                                {/* Trend Indicator badge for top items */}
                                {idx < 3 && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-black text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                                        <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                                        {idx === 0 ? 'FAST SELLING' : 'POPULAR'}
                                    </div>
                                )}

                                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                                    {/* Image */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                        <Link to={`/product/${product._id || product.id}`}>
                                            <img
                                                src={product.images?.[0] || product.image || "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80"}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </Link>

                                        <button
                                            onClick={() => handleAction('Wishlist')}
                                            className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors hover:scale-110"
                                        >
                                            <Heart className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Info */}
                                    <div className="p-6">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                                                #{idx + 1} Trending
                                            </span>
                                            <span className="text-xs text-gray-400">{product.category}</span>
                                        </div>

                                        <Link to={`/product/${product._id || product.id}`}>
                                            <h3 className="font-heading font-bold text-lg text-gray-900 mb-1 leading-tight hover:text-purple-700 transition-colors">{product.name}</h3>
                                        </Link>
                                        <div className="flex items-center justify-between mt-4">
                                            <p className="font-bold text-xl">₹{product.price}</p>
                                            <button
                                                onClick={() => handleAction('Add to Cart')}
                                                className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                            >
                                                <ShoppingBag className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
