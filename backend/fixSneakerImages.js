const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./src/models/Product');

dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

const fixImages = async () => {
    try {
        await connectDB();

        const updates = [
            {
                name: "Canvas Sneakers", // Exact name from screenshot
                image: "https://images.unsplash.com/photo-1607522370275-f14206c11513?auto=format&fit=crop&q=80&w=800" // Classic Converse
            },
            {
                name: "Clifton 9",
                image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800" // Athletic Hoka style
            },
            {
                name: "Gel Kayano 29",
                image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800" // Asics style
            },
            {
                name: "Zoom X Pro",
                image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800"
            }
        ];

        for (const update of updates) {
            const product = await Product.findOne({ name: update.name });
            if (product) {
                // Update both 'images' array and 'image' field if it exists to be safe
                product.images = [update.image];
                if (product.image) product.image = update.image;

                await product.save();
                console.log(`✅ Fixed image for: ${update.name}`);
            } else {
                console.log(`⚠️ Product not found: ${update.name}`);
            }
        }

        console.log('Image fix complete.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixImages();
