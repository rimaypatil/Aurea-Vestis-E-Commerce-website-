const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user.id }).populate('items.product');

        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user.id, items: [] });
        }

        res.status(200).json({ success: true, data: wishlist });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user.id, items: [] });
        }

        // Check if item already exists
        const isItemPresent = wishlist.items.some(item => item.product.toString() === productId);

        if (!isItemPresent) {
            wishlist.items.push({ product: productId });
            await wishlist.save();
        }

        // Sanity check: repopulate to return full object immediately? 
        // Or just return success. Front end might need full list. 
        // Let's populate for consistency.
        await wishlist.populate('items.product');

        res.status(200).json({ success: true, data: wishlist });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
exports.removeFromWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            return res.status(404).json({ success: false, message: 'Wishlist not found' });
        }

        wishlist.items = wishlist.items.filter(item => item.product.toString() !== req.params.productId);

        await wishlist.save();
        await wishlist.populate('items.product');

        res.status(200).json({ success: true, data: wishlist });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
