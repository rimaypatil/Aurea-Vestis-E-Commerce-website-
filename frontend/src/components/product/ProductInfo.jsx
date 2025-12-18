import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { motion } from 'framer-motion';

const ProductInfo = ({ product }) => {
    const { addToCart } = useShop();
    const { user } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(product.color || 'Default');
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState('');
    const [deliveryDate, setDeliveryDate] = useState(null);

    // Derive sizes if not present (fallback)
    const sizes = product.sizes && product.sizes.length > 0
        ? product.sizes
        : ['S', 'M', 'L', 'XL'];

    const handleAddToCart = () => {
        if (!user) {
            // Trigger generic Auth Modal if available globally, or redirect
            // Ideally, we trigger the GlobalAuthModal via a custom event or context method if exposed.
            // For now, let's assume global modal listens to unauth actions or we show toast
            document.dispatchEvent(new CustomEvent('open-auth-modal'));
            showToast('Please login to add items to cart', 'info');
            return;
        }
        if (!selectedSize && sizes.length > 0) {
            showToast('Please select a size', 'error');
            return;
        }

        addToCart(product._id, selectedSize, selectedColor, quantity);
        showToast('Added to Cart', 'success');
    };

    const handleBuyNow = () => {
        if (!user) {
            document.dispatchEvent(new CustomEvent('open-auth-modal'));
            showToast('Please login to proceed', 'info');
            return;
        }
        if (!selectedSize && sizes.length > 0) {
            showToast('Please select a size', 'error');
            return;
        }

        addToCart(product._id, selectedSize, selectedColor, quantity);
        navigate('/checkout');
    };

    const checkDelivery = () => {
        if (pincode.length === 6) {
            // Mock logic
            const date = new Date();
            date.setDate(date.getDate() + 5);
            setDeliveryDate(date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }));
        } else {
            showToast('Please enter a valid 6-digit pincode', 'error');
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 mb-2">
                <Link to="/" className="hover:text-brand-primary">Home</Link>
                {' / '}
                <Link to={`/home/${product.parentCategory}`} className="hover:text-brand-primary capitalize">
                    {product.parentCategory}
                </Link>
                {' / '}
                <span className="text-gray-900 font-medium truncate">{product.name}</span>
            </nav>

            {/* Title & Price */}
            <div>
                <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    {product.isOnSale && (
                        <>
                            <span className="text-lg text-gray-500 line-through">₹{(product.price * 1.5).toFixed(0)}</span>
                            <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded">
                                {Math.round(((product.price * 1.5 - product.price) / (product.price * 1.5)) * 100)}% OFF
                            </span>
                        </>
                    )}
                </div>
                <div className="text-xs text-gray-500">Inclusive of all taxes</div>

                {/* Rating */}
                <div className="flex items-center mt-2 gap-1 text-sm">
                    <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill={i < Math.floor(product.rating || 4.5) ? "currentColor" : "none"} className={i < Math.floor(product.rating || 4.5) ? "" : "text-gray-300"} />
                        ))}
                    </div>
                    <span className="text-gray-600">({product.numReviews || 42} Reviews)</span>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Variants */}
            <div className="space-y-4">
                {/* Color */}
                <div>
                    <span className="text-sm font-medium text-gray-900 block mb-2">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></span>
                    <div className="flex gap-2">
                        {/* Mock Color Swatch - Ideally fetched from backend variants */}
                        <button
                            className={`w-8 h-8 rounded-full border-2 ${selectedColor === product.color ? 'border-brand-primary ring-1 ring-offset-1 ring-brand-primary' : 'border-brand-accent'}`}
                            style={{ backgroundColor: product.color?.toLowerCase() || 'black' }}
                            onClick={() => setSelectedColor(product.color)}
                            title={product.color}
                        />
                    </div>
                </div>

                {/* Size */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-900">Select Size</span>
                        <button className="text-xs text-brand-primary underline">Size Guide</button>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`py-2 text-sm font-medium border rounded-md transition-all
                            ${selectedSize === size
                                        ? 'border-brand-accent bg-black text-white'
                                        : 'border-brand-accent text-gray-700 hover:border-brand-accent hover:bg-gray-50'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity */}
                {/* 
        <div className="flex items-center gap-3">
             <span className="text-sm font-medium">Quantity</span>
             <div className="flex items-center border border-gray-300 rounded">
                 <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                 <span className="px-3 py-1 text-sm font-medium w-8 text-center">{quantity}</span>
                 <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
             </div>
        </div>
        */}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black text-white py-4 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    <ShoppingBag size={20} /> Add to Cart
                </button>
                <button
                    onClick={handleBuyNow}
                    className="flex-1 border-2 border-brand-accent text-black py-4 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors"
                >
                    Buy Now
                </button>
                <button className="p-4 border border-brand-accent rounded-md hover:bg-gray-50 text-gray-600">
                    <Heart size={20} />
                </button>
            </div>

            {/* Delivery Check */}
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
                    <Truck size={18} /> Check Delivery
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter Pincode"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                        className="flex-1 border border-brand-accent rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                    />
                    <button
                        onClick={checkDelivery}
                        className="text-brand-primary text-sm font-medium hover:underline px-2"
                    >
                        Check
                    </button>
                </div>
                {deliveryDate && (
                    <div className="mt-2 text-sm text-green-700 flex items-center gap-1">
                        Estimated delivery by <strong>{deliveryDate}</strong>
                    </div>
                )}

                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} /> 100% Original Products
                    </div>
                    <div className="flex items-center gap-2">
                        <RefreshCw size={16} /> Easy 14 days returns and exchanges
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductInfo;
