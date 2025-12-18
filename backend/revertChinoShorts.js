const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const revertChino = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Original URL from seedMenSale.js
        const originalImage = "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop";

        const updatedProduct = await Product.findOneAndUpdate(
            { name: "Chino Shorts" },
            { $set: { images: [originalImage] } },
            { new: true }
        );

        console.log('Reverted Chino Shorts image:', updatedProduct.images);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

revertChino();
