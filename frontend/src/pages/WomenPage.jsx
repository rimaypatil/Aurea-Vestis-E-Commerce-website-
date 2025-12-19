import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Heart, Filter, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import WomenCategories from '../components/women/WomenCategories';
import FilterSidebar from '../components/common/FilterSidebar';
import SortDropdown from '../components/common/SortDropdown';
import JoinClub from '../components/JoinClub';
import Deals from '../components/Deals';
import LoadingSpinner from '../components/LoadingSpinner';

export default function WomenPage() {
    const { isAuthenticated, openAuthModal } = useAuth();
    const { addToCart, toggleWishlist, wishlist } = useShop();

    // State
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [filterOptions, setFilterOptions] = useState(null); // From backend
    const [selectedFilters, setSelectedFilters] = useState({
        priceRanges: []
    });
    const [sortBy, setSortBy] = useState('recommended');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Fetch Filter Options (Facets)
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await axios.get('https://aureavestis.netlify.app/api/products/filters', {
                    params: { gender: 'Women' }
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
            // Exclude Accessories and Sneakers to show only Clothing
            const params = {
                gender: 'Women',
                'category[nin]': 'Accessories,Sneakers',
                skip,
                limit
            };

            // Add Sort
            if (sortBy !== 'recommended') {
                params.sort = sortBy;
            }

            // Add Filters
            Object.keys(selectedFilters).forEach(key => {
                if (key === 'priceRanges') {
                    // Calculate global min/max
                    if (selectedFilters.priceRanges.length > 0) {
                        const mins = selectedFilters.priceRanges.map(r => r.min);
                        const maxs = selectedFilters.priceRanges.map(r => r.max !== undefined ? r.max : Infinity);
                        params.minPrice = Math.min(...mins);
                        // If any range has no max (e.g. 5000+), then we don't send maxPrice unless we want to cap it.
                        // But usually "5000+" means infinity. If infinity is present, don't send maxPrice.
                        const maxPrice = Math.max(...maxs);
                        if (maxPrice !== Infinity) {
                            params.maxPrice = maxPrice;
                        }
                    }
                } else if (Array.isArray(selectedFilters[key]) && selectedFilters[key].length > 0) {
                    // Key mapping: backend expects 'brands', 'colors' etc? NO.
                    // Backend productController checks: 'brand', 'color', 'fabric', 'occasion', 'fit', 'category'
                    // FilterSidebar uses keys: 'brands', 'colors', 'fabrics', 'fits', 'occasions', 'categories', 'sizes'
                    // We need to map 'brands' -> 'brand'
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

            const res = await axios.get('https://aureavestis.netlify.app/api/products', { params });
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
            <section className="relative w-full h-[60vh] bg-red-100 overflow-hidden flex items-center justify-center text-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop"
                        alt="Women Fashion"
                        className="w-full h-full object-cover opacity-90"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                <div className="relative z-10 text-white max-w-4xl px-6 animate-fade-in-up mt-10">
                    <h5 className="text-brand-accent tracking-[0.2em] font-bold text-sm mb-4 uppercase drop-shadow-md">Elevate Your Presence</h5>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 tracking-tighter shadow-sm">THE AUREA WOMAN</h1>
                    <p className="text-xl text-white/90 mb-8 font-light tracking-wide drop-shadow-md">Unapologetic elegance for the modern muse.</p>
                </div>
            </section>

            {/* Categories */}
            <WomenCategories />

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
                            <span className="text-gray-500 text-sm font-medium">Showing {products.length} of {totalCount} Items</span>
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
                        <div className="text-center py-20 text-gray-500">No products found matching your filters.</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product._id} className="group bg-white rounded-lg overflow-hidden border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                        <Link to={`/product/${product._id}`}>
                                            <img
                                                src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/400x500?text=No+Image'}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </Link>
                                        {product.discount > 0 && (
                                            <div className="absolute top-3 left-3 bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded">
                                                {product.discount}% OFF
                                            </div>
                                        )}
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

                                        <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent flex-col gap-2">
                                            <button
                                                onClick={(e) => handleAddToCart(e, product)}
                                                className="w-full bg-white text-brand-charcoal py-2.5 rounded font-medium text-sm hover:bg-brand-accent hover:text-white transition-colors cursor-pointer"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-1 h-5">
                                            <p className="text-xs text-brand-gray font-medium uppercase tracking-wide truncate pr-2">{product.brand}</p>
                                            {product.category && <p className="text-[10px] text-brand-accent bg-brand-ivory px-1.5 py-0.5 rounded whitespace-nowrap">{product.category}</p>}
                                        </div>
                                        <Link to={`/product/${product._id}`}>
                                            <h3 className="font-heading font-medium text-brand-charcoal truncate mb-1" title={product.name}>{product.name}</h3>
                                        </Link>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-brand-charcoal">₹{product.price}</span>
                                            {/* Original Price Logic if needed */}
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
                                className="border border-brand-charcoal text-brand-charcoal px-8 py-3 rounded hover:bg-brand-charcoal hover:text-white transition-colors uppercase text-sm font-bold tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loadingMore ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Brand Value for Women */}
            <section className="bg-brand-ivory text-brand-charcoal py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-8">Why Aurea Vestis?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="text-xl font-bold mb-2 text-brand-accent">Comfort & Elegance</h4>
                            <p className="text-gray-500 text-sm">Designs that move with you, bringing effortless style to your everyday.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-2 text-brand-accent">Premium Fabrics</h4>
                            <p className="text-gray-500 text-sm">Handpicked textiles that feel as good as they look.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-2 text-brand-accent">Versatile Styles</h4>
                            <p className="text-gray-500 text-sm">From boardrooms to brunches, our collection adapts to every occasion.</p>
                        </div>
                    </div>
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
