import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import FilterSidebar from '../components/common/FilterSidebar';
import SortDropdown from '../components/common/SortDropdown';

export default function WomenSalePage() {
    const navigate = useNavigate();
    const { isAuthenticated, openAuthModal } = useAuth();
    const { addToCart, toggleWishlist, wishlist } = useShop();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({ priceRanges: [], discountRanges: [] });
    const [sortBy, setSortBy] = useState('recommended');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Fetch Filters
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await axios.get('https://aureavestis.netlify.app/api/products/filters', {
                    params: { gender: 'Women' }
                });
                if (res.data.success) {
                    setFilters(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch filters", err);
            }
        };
        fetchFilters();
    }, []);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                gender: 'Women',
                discount: 60,
                sort: sortBy
            };

            // Apply Price Filters
            if (selectedFilters.priceRanges && selectedFilters.priceRanges.length > 0) {
                const mins = selectedFilters.priceRanges.map(r => r.min);
                const maxs = selectedFilters.priceRanges.map(r => r.max !== undefined ? r.max : Infinity);
                params.minPrice = Math.min(...mins);
                const maxPrice = Math.max(...maxs);
                if (maxPrice !== Infinity) params.maxPrice = maxPrice;
            }

            // Apply Discount Filters
            if (selectedFilters.discountRanges && selectedFilters.discountRanges.length > 0) {
                const mins = selectedFilters.discountRanges.map(r => r.min);
                const maxs = selectedFilters.discountRanges.map(r => r.max !== undefined ? r.max : Infinity);
                params['discount[gte]'] = Math.min(...mins);
                const maxDiscount = Math.max(...maxs);
                if (maxDiscount !== Infinity) params['discount[lte]'] = maxDiscount;
            }

            ['brand', 'color', 'fabric', 'occasion', 'fit', 'category', 'sizes'].forEach(key => {
                const stateKeyMap = {
                    'brand': 'brands',
                    'color': 'colors',
                    'fabric': 'fabrics',
                    'occasion': 'occasions',
                    'fit': 'fits',
                    'category': 'categories',
                    'sizes': 'sizes'
                };

                const stateKey = stateKeyMap[key];
                if (selectedFilters[stateKey] && selectedFilters[stateKey].length > 0) {
                    params[key] = selectedFilters[stateKey].join(',');
                }
            });

            const res = await axios.get('http://localhost:5000/api/products', { params });
            if (res.data.success) {
                setProducts(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch women's sale items", err);
        } finally {
            setLoading(false);
        }
    }, [sortBy, selectedFilters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleFilterChange = (key, value) => {
        if (key === 'priceRanges') setSelectedFilters(prev => ({ ...prev, priceRanges: value }));
        else if (key === 'discountRanges') setSelectedFilters(prev => ({ ...prev, discountRanges: value }));
        else setSelectedFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setSelectedFilters({ priceRanges: [], discountRanges: [] });
        setSortBy('recommended');
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
        <div className="min-h-screen bg-brand-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-brand-charcoal transition-colors w-fit">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back
                    </button>
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-black text-red-600 uppercase tracking-tight">Women's 60% Off</h1>
                            <p className="text-gray-500 text-sm mt-2">Exclusive deals on women's fashion. Limited time only.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <FilterSidebar
                            filters={filters}
                            selectedFilters={selectedFilters}
                            onFilterChange={handleFilterChange}
                            clearFilters={clearFilters}
                            showDiscount={true}
                            className="pr-8 border-r border-gray-100 h-screen sticky top-24 overflow-y-auto custom-scrollbar"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {/* Sort */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <div className="lg:hidden w-full flex justify-between items-center mb-4 md:mb-0">
                                <span className="text-gray-500 text-sm font-medium">Showing {products.length} Items</span>
                                <button
                                    onClick={() => setIsMobileFiltersOpen(true)}
                                    className="flex items-center gap-2 text-sm font-bold text-brand-charcoal border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50"
                                >
                                    <Filter className="w-4 h-4" /> Filters
                                </button>
                            </div>
                            <div className="hidden lg:flex items-center">
                                <span className="text-gray-500 text-sm mr-4 font-medium">Showing {products.length} Items</span>
                            </div>
                            <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="text-center py-20 flex justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-500">No items found matching your filters.</h3>
                                <button onClick={clearFilters} className="mt-6 text-brand-accent font-bold hover:underline">
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product._id} className="group bg-white rounded-lg overflow-hidden border border-transparent hover:border-black/5 hover:shadow-xl transition-all duration-300">
                                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                            <img
                                                src={product.images?.[0] || 'https://via.placeholder.com/400x500'}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2 py-1 uppercase tracking-wider shadow-md animate-pulse">
                                                60% OFF
                                            </div>
                                            <button onClick={(e) => handleWishlist(e, product)} className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer ${isInWishlist(product._id) ? 'text-red-500 opacity-100 translate-y-0' : 'text-gray-400'}`}>
                                                <Heart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                                            </button>
                                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                                                <button
                                                    onClick={(e) => handleAddToCart(e, product)}
                                                    className="w-full bg-white text-brand-charcoal py-2.5 rounded font-bold text-sm hover:bg-black hover:text-white transition-colors uppercase tracking-wider"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-heading font-bold text-base text-brand-charcoal mb-1 truncate">{product.name}</h3>
                                            <p className="text-xs text-gray-500 font-medium mb-2 uppercase">{product.category}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-red-600 text-lg">₹{Math.floor(product.price * 0.4)}</span>
                                                <span className="text-sm text-gray-400 line-through font-medium">₹{product.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

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
                                    clearFilters={clearFilters}
                                    showDiscount={true}
                                    className="w-full border-none h-auto p-4"
                                />
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
