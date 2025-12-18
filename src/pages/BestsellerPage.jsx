import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Filter, ChevronDown, Check, Star, Heart, ArrowLeft } from 'lucide-react';

export default function BestsellerPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [sortBy, setSortBy] = useState('highestRated');

    useEffect(() => {
        fetchBestsellers();
    }, []);

    const fetchBestsellers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/bestsellers');
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching bestsellers:', error);
            // Fallback mock data if server not running for dev
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Client-side sorting for the collected bestsellers
    const filteredProducts = products
        .slice() // Create a copy before sorting
        .sort((a, b) => {
            if (sortBy === 'highestRated') return b.rating - a.rating;
            if (sortBy === 'mostReviewed') return b.numReviews - a.numReviews;
            if (sortBy === 'priceLowHigh') return a.price - b.price;
            if (sortBy === 'priceHighLow') return b.price - a.price;
            return 0;
        });

    return (
        <div className="pt-24 pb-16 min-h-screen">
            {/* Hero Section */}
            <div className="bg-brand-charcoal text-white py-16 px-6 mb-12 relative">
                <Link to="/home" className="absolute left-6 top-6 text-gray-400 hover:text-white transition-colors p-2 z-10">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="max-w-7xl mx-auto text-center relative pt-8 md:pt-0">
                    <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">BESTSELLERS</h1>
                    <p className="text-xl text-gray-300 font-light tracking-wide">Loved by customers. Proven by ratings.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">


                    {/* Sort Dropdown - Simplified */}
                    <div className="relative group">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-white border border-gray-200 py-2.5 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:border-brand-charcoal cursor-pointer"
                        >
                            <option value="highestRated">Highest Rated</option>
                            <option value="mostReviewed">Most Reviewed</option>
                            <option value="priceLowHigh">Price: Low to High</option>
                            <option value="priceHighLow">Price: High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-charcoal"></div>
                    </div>
                ) : (
                    <>
                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => (
                                <div key={product._id || product.id} className="group bg-white rounded-xl overflow-hidden border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
                                    {/* Image */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                        <Link to={`/product/${product._id}`}>
                                            <img
                                                // Fallback image logic if backend image is different
                                                src={product.images?.[0] || product.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80"}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </Link>

                                        {/* Bestseller Badge */}
                                        <div className="absolute top-3 left-3 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded shadow-sm">
                                            BESTSELLER
                                        </div>

                                        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                            <Heart className="w-4 h-4" />
                                        </button>

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                                            <button className="w-full bg-white text-brand-charcoal py-3 rounded-lg font-bold text-sm hover:bg-brand-accent hover:text-white transition-colors shadow-lg">
                                                View Product
                                            </button>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-xs text-brand-gray font-medium uppercase tracking-wider">{product.category}</p>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-brand-accent fill-brand-accent" />
                                                <span className="text-xs font-bold">{product.rating || 4.8}</span>
                                                <span className="text-xs text-gray-400">({product.numReviews || 120})</span>
                                            </div>
                                        </div>
                                        <Link to={`/product/${product._id}`}>
                                            <h3 className="font-heading font-bold text-brand-charcoal text-lg mb-2 truncate hover:text-brand-accent transition-colors">
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <p className="text-brand-charcoal font-medium">₹{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                No bestsellers found in this category.
                            </div>
                        )}

                        {/* Trust Section */}
                        <div className="mt-24 border-t border-gray-100 pt-16 pb-8 text-center bg-gray-50 -mx-6 px-6">
                            <h3 className="text-2xl font-heading font-bold mb-4">Top Rated by Real Customers</h3>
                            <div className="flex justify-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 text-brand-accent fill-brand-accent" />)}
                            </div>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                "The quality is unmatched. I've never felt more confident in my style." - Verified Buyer
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
