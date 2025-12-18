const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res) => {
    const { productId, size, color, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }

        // Check if product with same size and color already exists
        const itemIndex = cart.items.findIndex(item =>
            item.product.toString() === productId &&
            item.size === size &&
            item.color === color
        );

        if (itemIndex > -1) {
            // Update quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                product: productId,
                size: size,
                color: color,
                quantity: quantity,
                price: product.price,
                name: product.name,
                image: product.images[0] || ''
            });
        }

        await cart.save();
        res.status(200).json({ success: true, data: cart });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
exports.removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);

        await cart.save();
        res.status(200).json({ success: true, data: cart });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Update item quantity
// @route   PUT /api/cart/:productId
// @access  Private
exports.updateCartItemQuantity = async (req, res) => {
    const { quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === req.params.productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.status(200).json({ success: true, data: cart });
        } else {
            res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
