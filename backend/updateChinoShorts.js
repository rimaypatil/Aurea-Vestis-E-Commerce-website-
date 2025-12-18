const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const updateProduct = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const updatedProduct = await Product.findOneAndUpdate(
            { name: "Chino Shorts" },
            { $set: { images: ["/images/chino_shorts.png"] } },
            { new: true }
        );

        if (updatedProduct) {
            console.log('Successfully updated Chino Shorts image:', updatedProduct.images);
        } else {
            console.log('Product "Chino Shorts" not found.');
        }

        process.exit();
    } catch (error) {
        console.error('Error updating product:', error);
        process.exit(1);
    }
};

updateProduct();
