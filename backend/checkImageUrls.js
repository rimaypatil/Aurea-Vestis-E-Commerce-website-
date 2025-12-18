const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const https = require('https');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkUrl = (url) => {
    return new Promise((resolve) => {
        if (!url || !url.startsWith('http')) {
            resolve({ url, status: 'Invalid URL' });
            return;
        }
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', (e) => {
            resolve({ url, status: 'Error: ' + e.message });
        });
    });
};

const checkImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);

        const products = await Product.find({ parentCategory: 'men' }).select('name images');
        console.log(`Checking images for ${products.length} products...`);

        for (const product of products) {
            if (product.images && product.images.length > 0) {
                for (const img of product.images) {
                    const result = await checkUrl(img);
                    if (result.status !== 200) {
                        console.log(`[BROKEN] Product: ${product.name} | URL: ${img} | Status: ${result.status}`);
                    } else {
                        // console.log(`[OK] Product: ${product.name}`);
                    }
                }
            } else {
                console.log(`[NO IMAGE] Product: ${product.name}`);
            }
        }

        console.log('Image check complete.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkImages();
