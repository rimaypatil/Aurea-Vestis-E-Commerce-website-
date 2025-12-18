const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Please provide an email address' });
        }

        // Check if email already exists
        const existingSubscription = await Newsletter.findOne({ email });

        if (existingSubscription) {
            return res.status(400).json({ success: false, message: 'This email is already subscribed.' });
        }

        // Create new subscription
        await Newsletter.create({
            email
        });

        res.status(201).json({
            success: true,
            message: 'Successfully subscribed to the newsletter!'
        });
    } catch (err) {
        // Mongoose duplicate key error (fallback)
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'This email is already subscribed.' });
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages[0] });
        }

        console.error('Newsletter Subscription Error:', err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.'
        });
    }
};
