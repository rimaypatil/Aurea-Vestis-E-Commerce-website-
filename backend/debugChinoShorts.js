const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const debugChino = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const products = await Product.find({ name: /Chino Shorts/i });
        console.log(`Found ${products.length} products with "Chino Shorts"`);
        products.forEach(p => {
            console.log(`ID: ${p._id}, Name: ${p.name}, Images: ${p.images}, Price: ${p.price}`);
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugChino();
