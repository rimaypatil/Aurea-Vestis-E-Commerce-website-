const User = require('../models/User');

// @desc    Get all addresses
// @route   GET /api/addresses
// @access  Private
exports.getAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, data: user.addresses });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Add new address
// @route   POST /api/addresses
// @access  Private
exports.addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        user.addresses.push(req.body);
        await user.save();

        res.status(201).json({ success: true, data: user.addresses });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Update address
// @route   PUT /api/addresses/:id
// @access  Private
exports.updateAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const address = user.addresses.id(req.params.id);

        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        // Update fields
        address.set(req.body);
        await user.save();

        res.status(200).json({ success: true, data: user.addresses });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Delete address
// @route   DELETE /api/addresses/:id
// @access  Private
exports.deleteAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        user.addresses.pull(req.params.id);
        await user.save();

        res.status(200).json({ success: true, data: user.addresses });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
