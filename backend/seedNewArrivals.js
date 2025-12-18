const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedNewArrivals = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Reset all products to NOT be new arrivals first
        await Product.updateMany({}, { isNewArrival: false });
        console.log('Reset all products isNewArrival to false');

        // Select 15 diverse products to be New Arrivals
        // 4 Men, 4 Women, 4 Sneakers, 3 Accessories
        const newArrivals = [];

        const men = await Product.find({ gender: 'Men', category: { $ne: 'Sneakers' } }).limit(4);
        const women = await Product.find({ gender: 'Women', category: { $ne: 'Sneakers' } }).limit(4);
        const sneakers = await Product.find({ category: 'Sneakers' }).limit(4);
        const accessories = await Product.find({ category: { $in: ['Accessories', 'Bags', 'Jewellery', 'Watches'] } }).limit(3);

        newArrivals.push(...men, ...women, ...sneakers, ...accessories);

        for (const product of newArrivals) {
            product.isNewArrival = true;
            // Update createdAt to be very recent so 'sort=newest' works if used
            product.createdAt = new Date();
            await product.save();
            console.log(`Marked as New: ${product.name} (${product.category})`);
        }

        console.log(`Successfully marked ${newArrivals.length} products as New Arrivals.`);
        process.exit();
    } catch (error) {
        console.error('Error seeding New Arrivals:', error);
        process.exit(1);
    }
};

seedNewArrivals();
