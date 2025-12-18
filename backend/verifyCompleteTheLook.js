const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const verifyCompleteTheLook = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const count = await Product.countDocuments({ accessoriesTag: 'complete-look' });
        console.log(`Complete The Look Count: ${count}`);

        if (count >= 10) {
            console.log('Verification Success: At least 10 items found.');
        } else {
            console.log(`Verification Failed: Only ${count} items found, expected 10.`);
        }

        process.exit();
    } catch (error) {
        console.error('Error verifying Complete The Look:', error);
        process.exit(1);
    }
};

verifyCompleteTheLook();
