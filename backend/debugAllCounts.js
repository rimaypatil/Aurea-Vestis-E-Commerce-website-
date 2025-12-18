const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const debugCounts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);

        const categories = await Product.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);
        console.log("Categories:", categories);

        const parentCategories = await Product.aggregate([
            { $group: { _id: "$parentCategory", count: { $sum: 1 } } }
        ]);
        console.log("Parent Categories:", parentCategories);

        const genders = await Product.aggregate([
            { $group: { _id: "$gender", count: { $sum: 1 } } }
        ]);
        console.log("Genders:", genders);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

debugCounts();
