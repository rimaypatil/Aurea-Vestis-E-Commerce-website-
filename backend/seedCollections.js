const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

const seedCollections = async () => {
    await connectDB();

    const collections = [
        'Everyday Essentials',
        'Street & Utility',
        'Winter Collection',
        'Comfort Outfit'
    ];

    try {
        // Clear specifically these collections first to avoid duplicates if re-run (optional, but safer to just update)
        // Actually, let's just update existing products to belong to these collections to save time creating new ones
        // OR create specific ones if DB is empty.

        const count = await Product.countDocuments();
        console.log(`Current product count: ${count}`);

        if (count === 0) {
            console.log('No products found. Creating dummy products for collections...');
            // Create 3 products for each collection
            for (const collection of collections) {
                for (let i = 1; i <= 3; i++) {
                    await Product.create({
                        name: `${collection} Item ${i}`,
                        description: `A great item for ${collection}`,
                        price: 1000 + i * 100,
                        gender: 'Unisex',
                        category: 'New',
                        brand: 'Aurea',
                        stock: 10,
                        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
                        collectionName: collection
                    });
                }
            }
            console.log('Created new products.');
        } else {
            console.log('Updating existing products to belong to collections...');
            const products = await Product.find({});

            // Distribute products into collections round-robin
            for (let i = 0; i < products.length; i++) {
                products[i].collectionName = collections[i % collections.length];
                await products[i].save();
            }
            console.log('Updated existing products.');
        }

    } catch (error) {
        console.error('Error seeding collections:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedCollections();
