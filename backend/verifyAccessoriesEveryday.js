const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const verifyEverydayAccessories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const count = await Product.countDocuments({ accessoriesTag: 'everyday' });
        console.log(`Everyday Accessories Count: ${count}`);

        if (count >= 15) {
            console.log('Verification Success: At least 15 items found.');
        } else {
            console.log(`Verification Failed: Only ${count} items found.`);
        }

        process.exit();
    } catch (error) {
        console.error('Error verifying Everyday Accessories:', error);
        process.exit(1);
    }
};

verifyEverydayAccessories();
