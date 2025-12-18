const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkSneakers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check a few known sneakers
        const names = ["Urban Daily Kicks", "Court King High", "Eco Runner"];
        const products = await Product.find({ name: { $in: names } });

        products.forEach(p => {
            console.log(`Product: ${p.name}`);
            console.log(`  Category: ${p.category}`);
            console.log(`  SubCategory: '${p.subCategory}'`); // Quote to see spaces
            console.log('----------------');
        });

        // Debug query count
        const countCasual = await Product.countDocuments({ subCategory: 'Casual Sneakers' });
        console.log(`Count 'Casual Sneakers': ${countCasual}`);

        const countEmpty = await Product.countDocuments({ subCategory: { $exists: false } });
        console.log(`Count missing subCategory: ${countEmpty}`);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkSneakers();
