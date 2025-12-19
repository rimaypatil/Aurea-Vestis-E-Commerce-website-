import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState(null);
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    // Fetch Cart
    const fetchCart = async () => {
        if (!isAuthenticated) return;
        try {
            const res = await axios.get('https://aureavestis.netlify.app/api/cart');
            if (res.data.success) {
                setCart(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // Fetch Wishlist
    const fetchWishlist = async () => {
        if (!isAuthenticated) return;
        try {
            const res = await axios.get('https://aureavestis.netlify.app/api/wishlist');
            if (res.data.success) {
                setWishlist(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
            fetchWishlist();
        } else {
            setCart(null);
            setWishlist(null);
        }
    }, [isAuthenticated]);

    // Cart Actions
    const addToCart = async (productId, size, color, quantity = 1) => {
        if (!isAuthenticated) return false;
        try {
            const res = await axios.post('https://aureavestis.netlify.app/api/cart', { productId, size, color, quantity });
            if (res.data.success) {
                setCart(res.data.data);
                showToast('Added to Cart', 'success');
                return true;
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            showToast('Failed to add to cart', 'error');
        }
        return false;
    };

    const updateQuantity = async (productId, quantity) => {
        if (!isAuthenticated) return;
        try {
            const res = await axios.put(`https://aureavestis.netlify.app/api/cart/${productId}`, { quantity });
            if (res.data.success) {
                setCart(res.data.data);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeFromCart = async (productId) => {
        if (!isAuthenticated) return;
        try {
            const res = await axios.delete(`https://aureavestis.netlify.app/api/cart/${productId}`);
            if (res.data.success) {
                setCart(res.data.data);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    // Wishlist Actions
    const toggleWishlist = async (productId) => {
        if (!isAuthenticated) return false;

        const inWishlist = wishlist?.items?.some(item => item.product._id === productId || item.product === productId);

        try {
            if (inWishlist) {
                const res = await axios.delete(`https://aureavestis.netlify.app/api/wishlist/${productId}`);
                if (res.data.success) {
                    setWishlist(res.data.data);
                    showToast('Removed from Wishlist', 'info');
                }
            } else {
                const res = await axios.post('https://aureavestis.netlify.app/api/wishlist', { productId });
                if (res.data.success) {
                    setWishlist(res.data.data);
                    showToast('Added to Wishlist', 'success');
                }
            }
            return true;
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            showToast('Failed to update wishlist', 'error');
        }
        return false;
    };

    // Derived state for UI
    const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    const wishlistCount = wishlist?.items?.length || 0;

    return (
        <ShopContext.Provider value={{
            cart,
            wishlist,
            fetchCart,
            fetchWishlist,
            addToCart,
            updateQuantity,
            removeFromCart,
            toggleWishlist,
            cartCount,
            wishlistCount
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
