import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Filter, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import FeaturedDrops from '../components/new-arrivals/FeaturedDrops';
import FilterSidebar from '../components/common/FilterSidebar'; // Using Shared Component
import SortDropdown from '../components/common/SortDropdown';
import JoinClub from '../components/JoinClub';

export default function NewArrivalsPage() {
    const { isAuthenticated, openAuthModal } = useAuth();
    const { addToCart, toggleWishlist, wishlist } = useShop();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest'); // Default to newest
    const [filters, setFilters] = useState(null); // Dynamic filters from backend
    const [selectedFilters, setSelectedFilters] = useState({ priceRange: { min: 0, max: 10000 }, sizes: [] });
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Fetch Filters
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await axios.get('https://aureavestis.netlify.app/api/products/filters');
                if (res.data.success) {
                    setFilters(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch filters", err);
            }
        };
        fetchFilters();
    }, []);

    // Fetch Products
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = { sort: sortBy, limit: 15 }; // Limit to 15 as requested

            // Apply Filters
            if (selectedFilters.priceRange) {
                params.minPrice = selectedFilters.priceRange.min;
                params.maxPrice = selectedFilters.priceRange.max;
            }
            if (selectedFilters.sizes && selectedFilters.sizes.length > 0) {
                params.sizes = selectedFilters.sizes.join(',');
            }

            ['brand', 'color', 'fabric', 'occasion', 'fit', 'category', 'subCategory'].forEach(key => {
                if (selectedFilters[key] && selectedFilters[key].length > 0) {
                    params[key] = selectedFilters[key].join(',');
                }
            });

            // Using general products endpoint, defaulted to sorted by date (newest)
            const res = await axios.get('https://aureavestis.netlify.app/api/products', { params });
            if (res.data.success) {
                setProducts(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch new arrivals", err);
        } finally {
            setLoading(false);
        }
    }, [sortBy, selectedFilters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleFilterChange = (key, value) => {
        setSelectedFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const handleAddToCart = async (e, product) => {
        e.stopPropagation();
        if (!isAuthenticated) return openAuthModal();
        await addToCart(product._id);
    };

    const handleWishlist = async (e, product) => {
        e.stopPropagation();
        if (!isAuthenticated) return openAuthModal();
        await toggleWishlist(product._id);
    };

    const isInWishlist = (pid) => wishlist?.items?.some(item => item.product._id === pid || item.product === pid);

    return (
        <div className="bg-brand-white pt-24">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] md:h-[80vh] bg-black overflow-hidden flex items-center justify-center text-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1608739871923-7da6d372f3c2?w=600&auto=format&fit=crop&q=60"
                        alt="New Arrivals"
                        className="w-full h-full object-cover opacity-80"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent"></div>

                <div className="relative z-10 text-white max-w-5xl px-6 animate-fade-in-up mt-10">
                    <h5 className="bg-brand-white text-brand-accent px-4 py-1 inline-block rounded-full tracking-widest font-bold text-xs mb-6 uppercase shadow-lg">Just Dropped</h5>
                    <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tighter shadow-sm italic outline-text">NEW ENERGY</h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-10 font-light tracking-wide max-w-3xl mx-auto">Fresh styles. Bold designs. Limited stock.</p>
                </div>
            </section>

            {/* Featured Drops */}
            <FeaturedDrops />

            {/* Main Content Area */}
            <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
                    <FilterSidebar
                        filters={filters}
                        selectedFilters={selectedFilters}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                {/* Product Grid Area */}
                <div className="flex-1">
                    {/* Sorting Toolbar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-100">
                        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
                            <span className="text-gray-500 text-sm font-medium">Showing {products.length} Fresh Finds</span>
                            <button
                                onClick={() => setIsMobileFiltersOpen(true)}
                                className="lg:hidden flex items-center gap-2 text-sm font-bold text-brand-charcoal border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50"
                            >
                                <Filter className="w-4 h-4" /> Filters
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-brand-charcoal">Sort By:</span>
                            <SortDropdown currentSort={sortBy} onSortChange={handleSortChange} />
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="text-center py-20 flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">No new arrivals found matching your criteria.</div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {products.map((product) => (
                                <div key={product._id} className="group bg-white rounded-lg overflow-hidden border border-transparent hover:border-black/5 hover:shadow-2xl transition-all duration-500">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                        <Link to={`/product/${product._id}`}>
                                            <img
                                                src={product.images?.[0] || 'https://via.placeholder.com/400x500'}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </Link>
                                        <div className="absolute top-3 left-3 bg-brand-accent text-white text-xs font-black px-2 py-1 uppercase tracking-wider shadow-md animate-pulse">
                                            New
                                        </div>
                                        <button onClick={(e) => handleWishlist(e, product)} className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:text-red-500 transition-colors opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transform translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0 duration-300 cursor-pointer hover:scale-110 ${isInWishlist(product._id) ? 'text-red-500 opacity-100 translate-y-0' : 'text-gray-400'}`}>
                                            <Heart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                                        </button>
                                        <button onClick={(e) => handleAddToCart(e, product)} className="lg:hidden absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-brand-accent hover:text-white transition-colors cursor-pointer z-10">
                                            <ShoppingBag className="w-5 h-5" />
                                        </button>

                                        <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent flex-col gap-2">
                                            <button onClick={(e) => handleAddToCart(e, product)} className="w-full bg-white text-black py-3 rounded font-bold text-sm hover:bg-brand-accent hover:text-white transition-colors cursor-pointer uppercase tracking-widest">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-1 h-5">
                                            <p className="text-[10px] md:text-xs text-brand-gray font-bold uppercase tracking-wider truncate w-1/2">{product.brand}</p>
                                            <p className="text-[10px] md:text-xs text-brand-charcoal font-medium opacity-60 truncate w-1/2 text-right">{product.category}</p>
                                        </div>
                                        <Link to={`/product/${product._id}`}>
                                            <h3 className="font-heading font-bold text-base md:text-lg text-brand-charcoal mb-1 truncate hover:text-brand-accent transition-colors">
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <span className="font-bold text-brand-charcoal text-base md:text-lg">₹{product.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    <div className="mt-12 text-center">
                        <button className="bg-brand-charcoal text-white px-10 py-4 rounded hover:bg-brand-accent transition-colors uppercase text-sm font-bold tracking-widest shadow-xl transform hover:-translate-y-1">
                            Discover More
                        </button>
                    </div>
                </div>
            </section>

            {/* Trending Right Now */}
            <section className="py-20 bg-brand-charcoal text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-heading font-black mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">TRENDING HEAT</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: "Editor's Picks", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" },
                            { title: "Influencer Faves", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" },
                            { title: "Street Style", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop" },
                            { title: "Bestsellers", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" }
                        ].map((item, idx) => (
                            <div key={idx} className="relative h-80 md:h-96 group overflow-hidden rounded-xl cursor-pointer">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 border-l-4 border-brand-accent pl-4">
                                    <h3 className="text-white text-xl md:text-2xl font-bold font-heading uppercase italic">{item.title}</h3>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Limited Drop */}
            <section className="bg-brand-accent py-12 text-white text-center">
                <div className="max-w-4xl mx-auto px-6 animate-pulse">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <Clock className="w-6 h-6" />
                        <span className="font-bold tracking-widest uppercase">Limited Time Drop</span>
                    </div>
                    <h2 className="text-3xl md:text-6xl font-heading font-black mb-6 uppercase">Once It's Gone, It's Gone.</h2>
                    <button className="bg-white text-brand-accent font-black px-10 py-4 rounded-full text-lg hover:bg-black hover:text-white transition-all shadow-xl">
                        Shop Before It Sells Out
                    </button>
                </div>
            </section>

            <JoinClub />

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
                                <FilterSidebar
                                    filters={filters}
                                    selectedFilters={selectedFilters}
                                    onFilterChange={handleFilterChange}
                                    className="w-full border-none h-auto p-4" // Override styles for mobile
                                />
                            </div>
                            <div className="p-4 border-t border-gray-100 bg-gray-50">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full bg-brand-charcoal text-white py-3 rounded font-bold uppercase tracking-widest text-sm"
                                >
                                    Show {products.length} Results
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

