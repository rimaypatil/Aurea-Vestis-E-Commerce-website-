const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const connectDB = require('./src/config/db');

dotenv.config();

const seedWomenSale = async () => {
    try {
        await connectDB();

        // Find existing Women's products
        const womenProducts = await Product.find({ gender: 'Women' });

        if (womenProducts.length > 0) {
            console.log(`Found ${womenProducts.length} Women's products.`);
            // Update up to 5 random products to have 60% discount
            const shuffled = womenProducts.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 5);

            for (const product of selected) {
                product.discount = 60;
                product.isOnSale = true;

                // Fix potential validation errors in existing data
                if (product.fit === 'Regular') product.fit = 'Regular Fit';
                if (!['Slim Fit', 'Regular Fit', 'Oversized', 'Skinny', 'Tapered', 'Relaxed', 'None'].includes(product.fit)) {
                    product.fit = 'None'; // Fallback
                }

                await product.save();
                console.log(`Updated product ${product.name} to 60% off.`);
            }
        } else {
            console.log("No Women's products found. Creating a test product.");
            await Product.create({
                name: "Test Women 60% Off Dress",
                description: "A beautiful dress at 60% off.",
                price: 2000,
                gender: "Women",
                category: "Dresses",
                parentCategory: "women",
                brand: "Aurea Vestis",
                stock: 10,
                discount: 60,
                isOnSale: true,
                images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop"]
            });
            console.log("Created test product.");
        }

        console.log("Seeding complete.");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedWomenSale();
