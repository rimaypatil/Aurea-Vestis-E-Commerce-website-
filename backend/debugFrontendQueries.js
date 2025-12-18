const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const debugQueries = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);

        // Simulate Sneakers Page Query
        console.log("\n--- Sneakers Query (category='Sneakers') ---");
        const sneakers = await Product.find({ category: 'Sneakers' }).sort('-createdAt').limit(5);
        sneakers.forEach(p => console.log(`${p.name} [${p.category}]`));

        // Simulate Men Page Query
        console.log("\n--- Men Query (parentCategory='men') ---");
        const men = await Product.find({ parentCategory: 'men' }).sort('-createdAt').limit(5);
        men.forEach(p => console.log(`${p.name} [${p.category}]`));

        // Simulate Women Page Query
        console.log("\n--- Women Query (gender='Women') ---");
        const women = await Product.find({ gender: 'Women' }).sort('-createdAt').limit(5);
        women.forEach(p => console.log(`${p.name} [${p.category}]`));

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

debugQueries();
