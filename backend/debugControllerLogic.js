const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const debugController = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);

        // Simulate what Express passes to the controller
        const reqQuery = {
            parentCategory: 'men',
            category: { nin: 'Accessories,Sneakers' }
        };

        console.log("Simulated req.query:", JSON.stringify(reqQuery, null, 2));

        // Logic copied from productController.js (CURRENT BROKEN STATE)
        // ---------------------------------------------------------

        // Copy req.query
        const queryObjRaw = { ...reqQuery };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit', 'minPrice', 'maxPrice', 'sizes', 'skip'];
        removeFields.forEach(param => delete queryObjRaw[param]);

        // Create query string
        let queryStr = JSON.stringify(queryObjRaw);
        // Create operators
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|ne|nin)\b/g, match => `$${match}`);

        const queryObj = JSON.parse(queryStr);
        console.log("Parsed queryObj for Mongoose:", JSON.stringify(queryObj, null, 2));

        // ---------------------------------------------------------

        const products = await Product.find(queryObj);
        console.log(`Found ${products.length} products matching query.`);

        if (products.length > 0) {
            console.log("Sample product:", products[0].name, products[0].category);
        }

        if (products.length === 0) {
            console.log("FAIL: Expected products but found 0.");
        } else {
            console.log("SUCCESS: Found products.");
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

debugController();
