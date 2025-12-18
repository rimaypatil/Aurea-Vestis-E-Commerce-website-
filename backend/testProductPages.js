const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const verifyPages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);

        const limit = 5;

        // 1. Men's Page Verification
        // Query: parentCategory='men', category NOT IN ['Accessories', 'Sneakers']
        console.log("\n--- Men's Page Check ---");
        const menProducts = await Product.find({
            parentCategory: 'men',
            category: { $nin: ['Accessories', 'Sneakers'] }
        }).limit(limit);

        if (menProducts.length === 0) console.log("No men's clothing found!");
        menProducts.forEach(p => {
            const status = (p.category !== 'Accessories' && p.category !== 'Sneakers') ? 'OK' : 'FAIL';
            console.log(`[${status}] ${p.name} - Cat: ${p.category}, Parent: ${p.parentCategory}`);
        });


        // 2. Women's Page Verification
        // Query: gender='Women', category NOT IN ['Accessories', 'Sneakers']
        console.log("\n--- Women's Page Check ---");
        const womenProducts = await Product.find({
            gender: 'Women',
            category: { $nin: ['Accessories', 'Sneakers'] }
        }).limit(limit);

        if (womenProducts.length === 0) console.log("No women's clothing found!");
        womenProducts.forEach(p => {
            const status = (p.category !== 'Accessories' && p.category !== 'Sneakers') ? 'OK' : 'FAIL';
            console.log(`[${status}] ${p.name} - Cat: ${p.category}, Gender: ${p.gender}`);
        });


        // 3. Sneakers Page Verification
        // Query: category='Sneakers'
        console.log("\n--- Sneakers Page Check ---");
        const sneakerProducts = await Product.find({
            category: 'Sneakers'
        }).limit(limit);

        if (sneakerProducts.length === 0) console.log("No sneakers found!");
        sneakerProducts.forEach(p => {
            const status = (p.category === 'Sneakers') ? 'OK' : 'FAIL';
            console.log(`[${status}] ${p.name} - Cat: ${p.category}`);
        });


        // 4. Accessories Page Verification
        // Query: category='Accessories'
        console.log("\n--- Accessories Page Check ---");
        const accessoryProducts = await Product.find({
            category: 'Accessories'
        }).limit(limit);

        if (accessoryProducts.length === 0) console.log("No accessories found!");
        accessoryProducts.forEach(p => {
            const status = (p.category === 'Accessories') ? 'OK' : 'FAIL';
            console.log(`[${status}] ${p.name} - Cat: ${p.category}`);
        });

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyPages();
