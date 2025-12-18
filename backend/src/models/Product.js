const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    gender: {
        type: String,
        required: [true, 'Please add a gender'],
        enum: ['Men', 'Women', 'Unisex', 'Kids']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        // Expanding enum to include specific product types for both Men and Women + logical groupings
        enum: [
            // Men
            'T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Hoodies', 'Sweaters', 'Co-ords',
            // Women
            'Dresses', 'Tops', 'Ethnic Wear', 'Skirts', 'Co-Ords', 'Activewear',
            // Common
            'Sneakers', 'Accessories', 'Bags', 'Footwear', 'Wallets', 'Belts', 'Perfume', 'Watches', 'Jewellery', 'Sunglasses', 'Hats',
            // Special
            'New', 'Sale'
        ]
    },
    parentCategory: {
        type: String,
        enum: ['men', 'women', 'kids', 'unisex'],
        required: [true, 'Please add a parent category'],
        index: true
    },
    collectionName: {
        type: String,
        enum: ['Everyday Essentials', 'Street & Utility', 'Winter Collection', 'Comfort Outfit', 'None'],
        default: 'None'
    },
    subCategory: {
        type: String,
        trim: true
    },
    sizes: {
        type: [String],
        default: [] // e.g., ["S", "M", "L"] or ["UK 7", "UK 8"]
    },
    color: {
        type: String,
        trim: true // e.g., "Black", "Navy"
    },
    fit: {
        type: String, // e.g., "Slim Fit", "Regular", "Oversized"
        enum: ['Slim Fit', 'Regular Fit', 'Oversized', 'Skinny', 'Tapered', 'Relaxed', 'None'],
        default: 'None'
    },
    fabric: {
        type: String, // e.g., "Cotton", "Denim", "Linen"
        default: 'None'
    },
    occasion: {
        type: String, // e.g., "Casual", "Formal", "Party"
        enum: ['Casual', 'Formal', 'Party', 'Sports', 'Streetwear', 'None'],
        default: 'None'
    },
    sneakerTag: {
        type: String,
        enum: ['street', 'performance', 'bestseller', 'seasonal', null],
        default: null
    },
    accessoriesTag: {
        type: String,
        enum: ['everyday', 'travel', 'minimal', 'bestseller', 'complete-look', null],
        default: null
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand']
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        default: 0
    },
    images: {
        type: [String],
        default: []
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isNewArrival: {
        type: Boolean,
        default: false
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        default: 0
    },
    salesCount: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
