import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShoppingBag, Heart, ChevronDown, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterSidebar from '../components/common/FilterSidebar';

import SortDropdown from '../components/common/SortDropdown';

export default function CategoryPage() {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, openAuthModal } = useAuth();
    const { addToCart, toggleWishlist, wishlist } = useShop();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('recommended');
    const [filterOptions, setFilterOptions] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        priceRanges: []
    });
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Format slug to Title Case (e.g., 'casual-sneakers' -> 'Casual Sneakers')
    const formatSubcategory = (slug) => {
        if (!slug) return '';
        const map = {
            't-shirts': 'T-Shirts',
            'tshirts': 'T-Shirts',
            'co-ords': 'Co-Ords',
            'high-tops': 'High-Tops',
            'low-tops': 'Low-Tops'
        };
        if (map[slug]) return map[slug];
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const displaySubcategory = formatSubcategory(subcategory);

    // Fetch Filter Options based on context
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const params = {};
                // Context logic
                if (['men', 'women'].includes(category.toLowerCase())) {
                    params.gender = displayCategory;
                } else {
                    params.category = displayCategory; // Sneakers or Accessories
                }

                const res = await axios.get('http://localhost:5000/api/products/filters', { params });

                if (res.data.success) {
                    setFilterOptions(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch filter options", err);
            }
        };
        fetchFilters();
    }, [category]);

    // Fetch Products
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = {};

            // Base Context
            if (['men', 'women'].includes(category.toLowerCase())) {
                params.gender = displayCategory; // e.g., 'Men'
                params.category = displaySubcategory; // e.g., 'Jeans'
            } else if (category.toLowerCase() === 'accessories') {
                params.category = displaySubcategory; // e.g. 'Bags' (mapped from URL subcategory)
            } else {
                params.category = displayCategory; // e.g., 'Sneakers'
                params.subCategory = displaySubcategory; // e.g., 'Casual Sneakers'
            }

            // Sorting
            if (sortBy !== 'recommended') params.sort = sortBy;

            // Filters (Sidebar)
            Object.keys(selectedFilters).forEach(key => {
                if (key === 'priceRanges') {
                    if (selectedFilters.priceRanges.length > 0) {
                        const mins = selectedFilters.priceRanges.map(r => r.min);
                        const maxs = selectedFilters.priceRanges.map(r => r.max !== undefined ? r.max : Infinity);
                        params.minPrice = Math.min(...mins);
                        const maxPrice = Math.max(...maxs);
                        if (maxPrice !== Infinity) params.maxPrice = maxPrice;
                    }
                } else if (Array.isArray(selectedFilters[key]) && selectedFilters[key].length > 0) {
                    const keyMap = {
                        brands: 'brand',
                        colors: 'color',
                        fabrics: 'fabric',
                        occasions: 'occasion',
                        fits: 'fit',
                        sizes: 'sizes',
                        categories: 'category' // This might overlap if we filter purely by subcategory
                    };
                    const backendKey = keyMap[key] || key;
                    params[backendKey] = selectedFilters[key].join(',');
                }
            });

            const res = await axios.get('http://localhost:5000/api/products', { params });
            if (res.data.success) {
                setProducts(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [category, subcategory, sortBy, selectedFilters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Handlers
    const handleFilterChange = (key, value) => {
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

    const handleAction = (action, product) => {
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }
        if (action === 'cart') addToCart(product._id);
        if (action === 'wishlist') toggleWishlist(product._id);
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
        <div className="min-h-screen bg-brand-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-brand-charcoal" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                <span className="uppercase tracking-widest cursor-pointer hover:text-brand-accent" onClick={() => navigate(`/home/${category}`)}>{displayCategory}</span>
                                <span>/</span>
                                <span className="uppercase tracking-widest text-brand-charcoal font-bold">{displaySubcategory}</span>
                            </div>
                            <h1 className="text-3xl font-heading font-bold text-brand-charcoal">{displaySubcategory}</h1>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 hidden md:inline">{products.length} Products</span>
                        <button
                            onClick={() => setIsMobileFiltersOpen(true)}
                            className="lg:hidden flex items-center gap-2 text-sm font-bold text-brand-charcoal border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50"
                        >
                            <Filter className="w-4 h-4" /> Filters
                        </button>
                        <div className="relative group">
                            <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar */}
                    <FilterSidebar
                        filters={filterOptions}
                        selectedFilters={selectedFilters}
                        onFilterChange={handleFilterChange}
                        clearFilters={clearFilters}
                        className="w-64 flex-shrink-0 hidden lg:block pr-8 border-r border-gray-100 h-screen sticky top-24 overflow-y-auto custom-scrollbar"
                    />



                    {/* Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <LoadingSpinner />
                        ) : products.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-2xl">
                                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500">We couldn't find any {displaySubcategory} matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                                {products.map((product) => (
                                    <div key={product._id} className="group relative">
                                        <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-4 relative">
                                            <Link to={`/product/${product._id}`}>
                                                <img
                                                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400'}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </Link>
                                            {/* Quick Actions */}
                                            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleAction('wishlist', product); }}
                                                    className={`p-2 bg-white rounded-full shadow-md hover:scale-110 transition-all ${isInWishlist(product._id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                                                >
                                                    <Heart className={`w-5 h-5 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleAction('cart', product); }}
                                                    className="p-2 bg-black text-white rounded-full shadow-md hover:bg-gray-800 hover:scale-110 transition-all"
                                                >
                                                    <ShoppingBag className="w-5 h-5" />
                                                </button>
                                            </div>
                                            {product.discount > 0 && (
                                                <span className="absolute top-3 left-3 bg-brand-accent text-white text-[10px] font-bold px-2 py-1 rounded">{product.discount}% OFF</span>
                                            )}
                                        </div>
                                        <div>
                                            <Link to={`/product/${product._id}`}>
                                                <h3 className="font-bold text-brand-charcoal text-base mb-1 truncate hover:text-brand-accent transition-colors">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <div className="flex justify-between items-center">
                                                <p className="text-gray-900 font-medium">₹{product.price}</p>
                                                <span className="text-xs text-gray-400 truncate max-w-[80px]">{product.brand}</span>
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
