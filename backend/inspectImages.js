const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const inspectImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const products = await Product.find({}, 'name gender category subCategory images parentCategory');

        console.log(`Total Products: ${products.length}`);

        const categoryStats = {};

        products.forEach(p => {
            const key = `${p.gender || 'Uni'}|${p.parentCategory}|${p.category}|${p.subCategory}`;
            if (!categoryStats[key]) categoryStats[key] = { count: 0, sampleImage: p.images[0] };
            categoryStats[key].count++;
        });

        console.log('\n--- Category Distribution & Sample Images ---');
        Object.entries(categoryStats).forEach(([key, data]) => {
            console.log(`${key}: ${data.count} items. Sample: ${data.sampleImage}`);
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

inspectImages();
