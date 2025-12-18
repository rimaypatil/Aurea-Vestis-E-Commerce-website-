const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        deliveryMethod,
        deliveryCharge,
        tax,
        discount,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ success: false, message: 'No order items' });
    }

    try {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            deliveryMethod,
            deliveryCharge,
            tax,
            discount,
            totalPrice
        });

        const createdOrder = await order.save();

        // Optional: Clear cart
        await Cart.findOneAndDelete({ user: req.user._id });

        res.status(201).json({ success: true, data: createdOrder });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Ensure user owns order or is admin
        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
