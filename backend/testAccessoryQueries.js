const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const testQueries = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Test 1: Accessories Page Query (All categories)
        const allAccessoriesCategories = ['Accessories', 'Bags', 'Footwear', 'Wallets', 'Belts', 'Perfume', 'Watches', 'Jewellery', 'Sunglasses', 'Hats'];
        console.log('\n--- Test 1: Accessories Page Query ---');
        console.log(`Querying categories: ${allAccessoriesCategories.join(', ')}`);

        const allAccessoriesCount = await Product.countDocuments({
            category: { $in: allAccessoriesCategories }
        });
        console.log(`Total Accessories Found: ${allAccessoriesCount}`);

        // Test 2: Category Page Query (Specific Category, e.g., Bags)
        console.log('\n--- Test 2: Category Page Query (Bags) ---');
        // This simulates /home/accessories/bags => params.category = 'Bags'
        const bagsCount = await Product.countDocuments({
            category: 'Bags'
        });
        console.log(`Bags Found: ${bagsCount}`);

        // Test 3: Category Page Query (Hats)
        console.log('\n--- Test 3: Category Page Query (Hats) ---');
        const hatsCount = await Product.countDocuments({
            category: 'Hats'
        });
        console.log(`Hats Found: ${hatsCount}`);

        console.log('\nVerification Complete');
        process.exit();
    } catch (error) {
        console.error('Error testing queries:', error);
        process.exit(1);
    }
};

testQueries();
