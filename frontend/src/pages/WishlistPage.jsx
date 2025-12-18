import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag, Heart } from 'lucide-react';

const WishlistPage = () => {
    const { isAuthenticated, openAuthModal } = useAuth();
    const { wishlist, toggleWishlist, addToCart } = useShop();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            openAuthModal();
        }
    }, [isAuthenticated, openAuthModal]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-brand-white p-6 text-center">
                <Heart className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-brand-charcoal mb-2">Login Required</h2>
                <p className="text-gray-500 mb-6">Please login to view your wishlist.</p>
                <button
                    onClick={openAuthModal}
                    className="bg-black text-white px-8 py-3 rounded-xl font-medium"
                >
                    Login Now
                </button>
            </div>
        );
    }

    const handleAddToCart = (product) => {
        addToCart(product._id || product);
        // Optional: Remove from wishlist after adding? User didn't specify. Keeping it.
    };

    return (
        <div className="min-h-screen bg-brand-white flex flex-col">
            {/* Header */}
            <div className="p-6 flex items-center gap-4 bg-white shadow-sm sticky top-0 z-10">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-brand-charcoal" />
                </button>
                <h1 className="text-xl font-heading font-bold">My Wishlist</h1>
            </div>

            <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
                {!wishlist || wishlist.items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                        <Heart className="w-20 h-20 text-gray-200 mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-8">Save items you love for later.</p>
                        <Link to="/home" className="px-8 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.items.map((item) => (
                            <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative">
                                <div className="aspect-[4/5] bg-gray-100 relative">
                                    <Link to={`/product/${item.product._id}`}>
                                        <img
                                            src={item.product.images?.[0] || item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                                        />
                                    </Link>
                                    <button
                                        onClick={() => toggleWishlist(item.product._id)}
                                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-red-500 hover:bg-white transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <Link to={`/product/${item.product._id}`}>
                                        <h3 className="font-bold text-gray-900 line-clamp-1 mb-1 hover:text-brand-accent transition-colors">{item.product.name}</h3>
                                    </Link>
                                    <p className="text-gray-500 text-sm mb-3">₹{item.product.price}</p>
                                    <button
                                        onClick={() => handleAddToCart(item.product)}
                                        className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
