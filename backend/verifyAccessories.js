const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const verifyAccessories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const categories = [
            'Bags', 'Footwear', 'Wallets', 'Belts', 'Perfume',
            'Watches', 'Jewellery', 'Sunglasses', 'Hats'
        ];

        for (const category of categories) {
            const count = await Product.countDocuments({ category });
            console.log(`${category}: ${count} products`);
        }

        process.exit();
    } catch (error) {
        console.error('Error verifying accessories:', error);
        process.exit(1);
    }
};

verifyAccessories();
