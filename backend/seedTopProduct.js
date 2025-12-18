const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const product = {
    name: "Blue T-Shirt",
    description: "Premium cotton blue t-shirt with a relaxed fit. Essential for your casual wardrobe.",
    price: 1999,
    category: "T-Shirts", // Matches Men's category filter
    parentCategory: "men",
    gender: "Men",
    brand: "AUREA VESTIS",
    color: "Blue",
    sizes: ["S", "M", "L", "XL"],
    // Use the local image path relative to the public folder
    images: ["/images/blue-t-shirt.png"],
    fabric: "100% Cotton",
    occasion: "Casual",
    fit: "Regular",
    rating: 5.0, // High rating to help with 'Recommended' sort
    numReviews: 1,
    countInStock: 50,
    createdAt: new Date() // Ensure it's the newest
};

const seedTopProduct = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Upsert based on name
        const result = await Product.findOneAndUpdate(
            { name: product.name },
            product,
            { upsert: true, new: true }
        );

        console.log(`Seeded Product: ${result.name}`);
        console.log(`Image Path: ${result.images[0]}`);

        process.exit();
    } catch (error) {
        console.error('Error seeding product:', error);
        process.exit(1);
    }
};

seedTopProduct();
