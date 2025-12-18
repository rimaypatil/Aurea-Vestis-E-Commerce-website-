const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkSneakers = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);

        const count = await Product.countDocuments({ category: 'Sneakers' });
        console.log(`Products with category='Sneakers': ${count}`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkSneakers();
