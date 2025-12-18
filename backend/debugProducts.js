const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const checkProducts = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);

        const count = await Product.countDocuments({ parentCategory: 'men' });
        console.log(`Products with parentCategory='men': ${count}`);

        const products = await Product.find({ parentCategory: 'men' }).limit(3);
        console.log('Sample products:', JSON.stringify(products, null, 2));

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkProducts();
