const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        size: String,
        color: String,
        quantity: {
            type: Number,
            default: 1,
            min: 1
        },
        price: Number, // Snapshot price or dynamic? Keeping it for now to calculate totals easier
        name: String,
        image: String
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cart', cartSchema);
