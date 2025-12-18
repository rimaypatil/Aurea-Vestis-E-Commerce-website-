const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkWomenProducts = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);

        const count = await Product.countDocuments({ gender: 'Women' });
        console.log(`Products with gender='Women': ${count}`);

        const parentCategoryCount = await Product.countDocuments({ parentCategory: 'women' });
        console.log(`Products with parentCategory='women': ${parentCategoryCount}`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkWomenProducts();
