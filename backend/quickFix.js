const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./src/models/Product');

// Explicit path to .env
dotenv.config({ path: path.join(__dirname, '.env') });

const updates = [
    {
        name: "Canvas Sneakers",
        image: "https://images.unsplash.com/photo-1607522370275-f14206c11513?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Clifton 9",
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Gel Kayano 29",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800"
    },
    {
        name: "Zoom X Pro",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800"
    }
];

const run = async () => {
    try {
        console.log('Connecting to MongoDB...');
        // Set a 10s timeout for connection
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
        console.log('Connected.');

        for (const update of updates) {
            console.log(`Updating ${update.name}...`);
            const result = await Product.updateOne(
                { name: update.name },
                { $set: { images: [update.image] } } // Explicitly setting the array
            );
            console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
        }

        console.log('ALL DONE');
        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err);
        process.exit(1);
    }
};

run();
