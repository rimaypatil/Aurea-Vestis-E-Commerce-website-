import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Heart, Filter, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import SneakersCategories from '../components/sneakers/SneakersCategories';
import FilterSidebar from '../components/common/FilterSidebar';
import SortDropdown from '../components/common/SortDropdown';
import JoinClub from '../components/JoinClub';
import Deals from '../components/Deals';
import LoadingSpinner from '../components/LoadingSpinner';

export default function SneakersPage() {
    const { isAuthenticated, openAuthModal } = useAuth();
    const { addToCart, toggleWishlist, wishlist } = useShop();

    // State
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [filterOptions, setFilterOptions] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        priceRanges: []
    });
    const [sortBy, setSortBy] = useState('recommended');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Fetch Filter Options
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await axios.get('https://aurea-vestis-e-commerce-website.onrender.com/api/products/filters', {
                    params: { category: 'Sneakers' }
                });
                if (res.data.success) {
                    setFilterOptions(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch filter options", err);
            }
        };
        fetchFilters();
    }, []);

    // Fetch Products with Filters
    const fetchProducts = useCallback(async ({ skip = 0, limit = 15, reset = false } = {}) => {
        if (reset) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }
        try {
            const params = { category: 'Sneakers', skip, limit };

            // Add Sort
            if (sortBy !== 'recommended') {
                params.sort = sortBy;
            }

            // Add Filters
            Object.keys(selectedFilters).forEach(key => {
                if (key === 'priceRanges') {
                    if (selectedFilters.priceRanges.length > 0) {
                        const mins = selectedFilters.priceRanges.map(r => r.min);
                        const maxs = selectedFilters.priceRanges.map(r => r.max !== undefined ? r.max : Infinity);
                        params.minPrice = Math.min(...mins);
                        const maxPrice = Math.max(...maxs);
                        if (maxPrice !== Infinity) {
                            params.maxPrice = maxPrice;
                        }
                    }
                } else if (Array.isArray(selectedFilters[key]) && selectedFilters[key].length > 0) {
                    const keyMap = {
                        brands: 'brand',
                        colors: 'color',
                        fabrics: 'fabric',
                        occasions: 'occasion',
                        fits: 'fit',
                        sizes: 'sizes',
                        categories: 'category'
                    };
                    const backendKey = keyMap[key] || key;
                    params[backendKey] = selectedFilters[key].join(',');
                }
            });

            const res = await axios.get('https://aurea-vestis-e-commerce-website.onrender.com/api/products', { params });
            if (res.data.success) {
                if (reset) {
                    setProducts(res.data.data);
                } else {
                    setProducts(prev => [...prev, ...res.data.data]);
                }
                setTotalCount(res.data.total || res.data.count);
            }
        } catch (err) {
            console.error("Failed to fetch products", err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [selectedFilters, sortBy]);

    useEffect(() => {
        fetchProducts({ skip: 0, limit: 15, reset: true });
    }, [fetchProducts]);

    const handleLoadMore = () => {
        fetchProducts({ skip: products.length, limit: 10, reset: false });
    };

    const handleFilterChange = (key, value, min, max) => {
        if (key === 'priceRanges') {
            setSelectedFilters(prev => ({ ...prev, priceRanges: value }));
        } else {
            setSelectedFilters(prev => ({ ...prev, [key]: value }));
        }
    };

    const clearFilters = () => {
        setSelectedFilters({ priceRanges: [] });
        setSortBy('recommended');
    };

    const handleAddToCart = async (e, product) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }
        await addToCart(product._id);
    };

    const handleWishlist = async (e, product) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }
        await toggleWishlist(product._id);
    };

    const isInWishlist = (productId) => {
        return wishlist?.items?.some(item => item.product._id === productId || item.product === productId);
    };

    const sortOptions = [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Newest First', value: 'newest' },
        { label: 'Price: Low to High', value: 'price_asc' },
        { label: 'Price: High to Low', value: 'price_desc' },
        { label: 'Highest Rated', value: 'rating_desc' },
        { label: 'Best Sellers', value: 'bestsellers' },
    ];

    return (
        <div className="pt-0 bg-brand-white">
            {/* Hero Section */}
            <section className="relative w-full h-[70vh] bg-black overflow-hidden flex items-center justify-center text-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1600&auto=format&fit=crop"
                        alt="Sneaker Lifestyle"
                        className="w-full h-full object-cover opacity-70"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="relative z-10 text-white max-w-4xl px-6 animate-fade-in-up mt-10">
                    <h5 className="text-brand-accent tracking-[0.2em] font-bold text-sm mb-4 uppercase">Urban Culture</h5>
                    <h1 className="text-6xl md:text-7xl font-heading font-bold mb-4 tracking-tighter shadow-sm italic">STEP INTO STYLE</h1>
                    <p className="text-xl text-gray-300 mb-8 font-light tracking-wide max-w-2xl mx-auto">Sneakers designed for movement, comfort, and expression.</p>
                    <button className="bg-white text-black font-bold px-10 py-4 rounded-full text-lg hover:bg-brand-accent hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl uppercase tracking-wider">
                        Explore Sneakers
                    </button>
                </div>
            </section>

            {/* Categories */}
            <SneakersCategories />

            {/* Main Content Area */}
            <section className="max-w-7xl mx-auto px-6 py-12 flex">
                {/* Sidebar */}
                <FilterSidebar
                    filters={filterOptions}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    clearFilters={clearFilters}
                    className="w-64 flex-shrink-0 hidden lg:block pr-8 border-r border-gray-100 h-screen sticky top-24 overflow-y-auto custom-scrollbar"
                />

                {/* Product Grid Area */}
                <div className="flex-1 lg:pl-8">
                    {/* Sorting Toolbar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-100">
                        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
                            <span className="text-gray-500 text-sm font-medium">Showing {products.length} of {totalCount} Kicks</span>
                            <button
                                onClick={() => setIsMobileFiltersOpen(true)}
                                className="lg:hidden flex items-center gap-2 text-sm font-bold text-brand-charcoal border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50"
                            >
                                <Filter className="w-4 h-4" /> Filters
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-brand-charcoal">Sort By:</span>
                            <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
                        </div>
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <LoadingSpinner />
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">No sneakers found.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div key={product._id} className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        <Link to={`/product/${product._id}`}>
                                            <img
                                                src={(function (p) {
                                                    const overrides = {
                                                        "Canvas Sneakers": "https://images.unsplash.com/photo-1607522370275-f14206c11513?auto=format&fit=crop&q=80&w=800",
                                                        "Clifton 9": "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
                                                        "Gel Kayano 29": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800",
                                                        "Zoom X Pro": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800"
                                                    };
                                                    return overrides[p.name] || (p.images && p.images[0] ? p.images[0] : 'https://via.placeholder.com/400x500?text=No+Image');
                                                })(product)}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </Link>
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            {product.discount > 0 && <span className="bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded">{product.discount}% OFF</span>}
                                            <span className="bg-black/50 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded">{product.gender || 'Unisex'}</span>
                                        </div>
                                        <button
                                            onClick={(e) => handleWishlist(e, product)}
                                            className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transform translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0 duration-300 cursor-pointer ${isInWishlist(product._id) ? 'text-red-500' : 'text-gray-400'}`}
                                        >
                                            <Heart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                                        </button>
                                        <button
                                            onClick={(e) => handleAddToCart(e, product)}
                                            className="lg:hidden absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md text-brand-charcoal hover:bg-brand-accent hover:text-white transition-colors cursor-pointer z-10"
                                        >
                                            <ShoppingBag className="w-5 h-5" />
                                        </button>

                                        <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                                            <button
                                                onClick={(e) => handleAddToCart(e, product)}
                                                className="w-full bg-white text-black py-2.5 rounded font-bold text-sm hover:bg-brand-accent hover:text-white transition-colors cursor-pointer tracking-wide uppercase"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-brand-gray font-bold mb-1 uppercase tracking-wider">{product.brand}</p>
                                        <Link to={`/product/${product._id}`}>
                                            <h3 className="font-heading font-bold text-lg text-brand-charcoal mb-1 hover:text-brand-accent transition-colors">
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-brand-charcoal text-lg">₹{product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {products.length < totalCount && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="bg-black text-white px-10 py-4 rounded hover:bg-brand-accent transition-colors uppercase text-sm font-bold tracking-widest shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loadingMore ? 'Loading Kicks...' : 'Load More Kicks'}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Trending Sneakers */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-heading font-bold mb-2">Trending Now</h2>
                        <p className="text-gray-500">The hottest drops this week.</p>
                    </div>
                    <button className="hidden md:block text-brand-charcoal font-bold underline hover:text-brand-accent">View All</button>
                </div>
                <div className="flex overflow-x-auto pb-8 gap-6 px-6 max-w-7xl mx-auto md:grid md:grid-cols-4 md:overflow-hidden scrollbar-hide">
                    {[
                        { title: "Street Picks", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", path: "street" },
                        { title: "Performance", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop", path: "performance" },
                        { title: "Best Sellers", img: "https://images.unsplash.com/photo-1597248881519-db089d3744a5?q=80&w=800&auto=format&fit=crop", path: "bestseller" },
                        { title: "Seasonal", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop", path: "seasonal" }
                    ].map((item, idx) => (
                        <Link
                            to={`/home/sneaker/${item.path}`}
                            key={idx}
                            className="relative h-80 min-w-[250px] group overflow-hidden rounded-lg cursor-pointer shadow-lg block"
                        >
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-white text-xl font-bold font-heading">{item.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Performance Block */}
            <section className="bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    {[
                        { title: "Cushioned Soles", desc: "Impact protection for every step." },
                        { title: "Breathable Mesh", desc: "Keep cool with advanced ventilation." },
                        { title: "Durable Design", desc: "Built to withstand the urban jungle." },
                        { title: "All-Day Comfort", desc: "Engineered for 24/7 wearability." }
                    ].map((feat, i) => (
                        <div key={i} className="p-6 border border-white/10 rounded-lg hover:border-brand-accent transition-colors">
                            <h4 className="text-xl font-bold mb-2 text-brand-accent">{feat.title}</h4>
                            <p className="text-gray-400 text-sm">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Deals />
            <Deals />
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
                                    filters={filterOptions}
                                    selectedFilters={selectedFilters}
                                    onFilterChange={handleFilterChange}
                                    clearFilters={clearFilters}
                                    className="w-full border-none h-auto p-4"
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
