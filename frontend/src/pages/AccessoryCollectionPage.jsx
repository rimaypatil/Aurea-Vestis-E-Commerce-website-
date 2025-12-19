import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import FilterSidebar from '../components/common/FilterSidebar';
import SortDropdown from '../components/common/SortDropdown';

export default function AccessoryCollectionPage() {
    const { tag } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, openAuthModal } = useAuth();
    const { addToCart, toggleWishlist, wishlist } = useShop();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterOptions, setFilterOptions] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({ priceRanges: [] });
    const [sortBy, setSortBy] = useState('recommended');

    const formattedTitle = {
        'everyday': 'Everyday Essentials',
        'travel': 'Travel Must-Haves',
        'minimal': 'Minimal Jewellery',
        'bestseller': 'Best Sellers',
        'complete-look': 'Complete the Look'
    }[tag] || 'Collection';

    // Fetch Filter Options
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await axios.get('https://aureavestis.netlify.app/api/products/filters', {
                    params: { category: 'Accessories' }
                });
                if (res.data.success) setFilterOptions(res.data.data);
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
            const params = { accessoriesTag: tag };

            if (sortBy !== 'recommended') params.sort = sortBy;

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
                    const keyMap = { brands: 'brand', colors: 'color', fabrics: 'fabric', occasions: 'occasion', fits: 'fit', sizes: 'sizes' };
                    const backendKey = keyMap[key] || key;
                    params[backendKey] = selectedFilters[key].join(',');
                }
            });

            // Use dedicated accessories endpoint
            const res = await axios.get('https://aureavestis.netlify.app/api/products/accessories', { params });
            if (res.data.success) {
                setProducts(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch accessory collection", err);
        } finally {
            setLoading(false);
        }
    }, [tag, sortBy, selectedFilters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleFilterChange = (key, value) => {
        if (key === 'priceRanges') setSelectedFilters(prev => ({ ...prev, priceRanges: value }));
        else setSelectedFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setSelectedFilters({ priceRanges: [] });
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

    const sortOptions = [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Newest First', value: 'newest' },
        { label: 'Price: Low to High', value: 'price_asc' },
        { label: 'Price: High to Low', value: 'price_desc' },
    ];

    return (
        <div className="min-h-screen bg-brand-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col gap-4 mb-8">
                    <button onClick={() => navigate('/home/accessories')} className="flex items-center text-gray-500 hover:text-brand-charcoal transition-colors w-fit">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Accessories
                    </button>
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-brand-accent font-bold tracking-widest text-sm uppercase">Curated Collection</span>
                            <h1 className="text-4xl font-heading font-bold text-brand-charcoal mt-2">{formattedTitle}</h1>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <FilterSidebar
                            filters={filterOptions}
                            selectedFilters={selectedFilters}
                            onFilterChange={handleFilterChange}
                            clearFilters={clearFilters}
                        />
                    </div>

                    {/* Grid */}
                    <div className="flex-1">
                        {/* Sort */}
                        <div className="flex justify-end mb-6">
                            <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
                        </div>

                        {loading ? (
                            <div className="text-center py-20">Loading collection...</div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                                <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                <p className="text-lg">No accessories found in this collection.</p>
                                <button onClick={clearFilters} className="mt-4 text-brand-accent font-bold hover:underline">Clear Filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product._id} className="group bg-white rounded-lg overflow-hidden border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                                        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                            <img
                                                src={product.images?.[0] || 'https://via.placeholder.com/400x500'}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {product.discount > 0 && <span className="absolute top-3 left-3 bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded">{product.discount}% OFF</span>}
                                            <button onClick={(e) => handleWishlist(e, product)} className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300 ${isInWishlist(product._id) ? 'text-red-500 opacity-100 translate-y-0' : 'text-gray-400'}`}>
                                                <Heart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                                            </button>
                                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                                                <button onClick={(e) => handleAddToCart(e, product)} className="w-full bg-white text-brand-charcoal py-2.5 rounded font-medium text-sm hover:bg-brand-accent hover:text-white transition-colors">Add to Cart</button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-1 h-5">
                                                <p className="text-xs text-brand-gray font-medium uppercase truncate pr-2">{product.brand}</p>
                                                {product.subCategory && <p className="text-[10px] text-brand-accent bg-brand-ivory px-1.5 py-0.5 rounded whitespace-nowrap">{product.subCategory}</p>}
                                            </div>
                                            <h3 className="font-heading font-medium text-brand-charcoal truncate mb-1">{product.name}</h3>
                                            <span className="font-bold text-brand-charcoal">₹{product.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
