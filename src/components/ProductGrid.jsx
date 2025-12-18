import { Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useNavigate, Link } from 'react-router-dom';

export default function ProductGrid({ products = [], title = "Trending This Week", showViewAll = true }) {
    const { isAuthenticated, openAuthModal } = useAuth();
    const navigate = useNavigate();

    const { addToCart, toggleWishlist, wishlist } = useShop();

    const handleAction = async (actionType, product) => {
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }

        if (actionType === 'Add to Cart') {
            await addToCart(product._id);
        } else if (actionType === 'Add to Wishlist') {
            await toggleWishlist(product._id);
        }
    };

    const isInWishlist = (productId) => {
        return wishlist?.items?.some(item => item.product._id === productId || item.product === productId);
    };

    if (!products || products.length === 0) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-brand-gray">No products found in this collection.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-brand-ivory">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-heading font-bold text-brand-charcoal">{title}</h2>
                    {showViewAll && (
                        <a href="#" className="hidden md:block text-brand-charcoal font-medium hover:text-brand-accent transition-colors border-b border-brand-charcoal pb-0.5 hover:border-brand-accent">View All Products</a>
                    )}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product._id || product.id} className="group bg-white rounded-lg overflow-hidden border border-transparent hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        src={product.images && product.images.length > 0 ? product.images[0] : (product.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")}
                                        alt={product.name || product.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </Link>

                                {/* Mobile Cart Button */}
                                <button
                                    onClick={() => handleAction('Add to Cart', product)}
                                    className="lg:hidden absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md text-brand-charcoal hover:bg-brand-accent hover:text-white transition-colors cursor-pointer z-10"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                </button>

                                {/* Desktop Overlay Actions */}
                                <div className="hidden lg:flex absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent flex-col gap-2">
                                    <button
                                        onClick={() => handleAction('Add to Cart', product)}
                                        className="w-full bg-white text-brand-charcoal py-2.5 rounded font-medium text-sm hover:bg-brand-accent hover:text-white transition-colors cursor-pointer"
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleAction('Add to Wishlist', product)}
                                    className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transform translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0 duration-300 cursor-pointer ${isInWishlist(product._id) ? 'text-red-500 opacity-100 translate-y-0' : 'text-gray-400'}`}
                                    title="Add to Wishlist"
                                >
                                    <Heart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                                </button>

                                {product.discount > 0 && (
                                    <div className="absolute top-3 left-3 bg-brand-charcoal text-white text-xs font-bold px-2 py-1 rounded">
                                        {product.discount}% OFF
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-4">
                                <p className="text-xs text-brand-gray font-medium mb-1 uppercase tracking-wide">{product.brand}</p>
                                <Link to={`/product/${product._id}`}>
                                    <h3 className="font-heading font-medium text-brand-charcoal truncate mb-1 hover:text-brand-accent transition-colors">
                                        {product.name || product.title}
                                    </h3>
                                </Link>

                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-bold text-brand-charcoal">₹{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                                    )}
                                </div>
                                <div className="flex items-center text-xs text-gray-400">
                                    <span className="text-yellow-500 mr-1">★</span> {product.rating || 0} ({product.numReviews || 0})
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showViewAll && (
                    <div className="mt-8 text-center md:hidden">
                        <a href="#" className="btn-secondary">View All Products</a>
                    </div>
                )}
            </div>
        </section>
    );
}
