const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const deleteChino = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const result = await Product.deleteOne({ name: "Chino Shorts" });

        if (result.deletedCount > 0) {
            console.log('Successfully deleted Chino Shorts product.');
        } else {
            console.log('Chino Shorts product not found.');
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

deleteChino();
