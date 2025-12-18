const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const verifyComfortOutfit = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const count = await Product.countDocuments({ collectionName: 'Comfort Outfit' });
        console.log(`Comfort Outfit Count: ${count}`);

        if (count >= 20) {
            console.log('Verification Success: At least 20 items found.');
        } else {
            console.log(`Verification Failed: Only ${count} items found, expected 20.`);
        }

        process.exit();
    } catch (error) {
        console.error('Error verifying Comfort Outfit:', error);
        process.exit(1);
    }
};

verifyComfortOutfit();
