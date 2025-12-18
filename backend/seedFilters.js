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

const brands = ['Nike', 'Adidas', 'Zara', 'H&M', 'Puma', 'Levis', 'Gucci', 'Aurea Vestis', 'Uniqlo', 'Urban Outfitters'];
const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Beige', 'Navy', 'Grey', 'Pink', 'Yellow'];
const fabrics = ['Cotton', 'Polyester', 'Linen', 'Denim', 'Silk', 'Wool', 'Velvet', 'Leather'];
const occasions = ['Casual', 'Formal', 'Party', 'Sports', 'Streetwear'];
const fits = ['Regular Fit', 'Slim Fit', 'Oversized', 'Relaxed', 'Skinny', 'Tapered'];
const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Sub-Category Definitions
const menSubCategories = ['T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Hoodies'];
const womenSubCategories = ['Dresses', 'Tops', 'Ethnic Wear', 'Skirts', 'Co-Ords', 'Activewear'];
const sneakersSubCategories = ['Casual Sneakers', 'Streetwear', 'Running', 'Training', 'High-Tops', 'Low-Tops', 'Chunky', 'Sustainable', 'Limited Edition'];
const accessoriesSubCategories = ['Bags', 'Footwear', 'Wallets', 'Belts', 'Perfume', 'Watches'];

const getRandomSizes = () => {
    const numSizes = Math.floor(Math.random() * 3) + 2; // 2 to 4 sizes
    const shuffled = [...allSizes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSizes).sort((a, b) => allSizes.indexOf(a) - allSizes.indexOf(b));
};

const seedFilters = async () => {
    await connectDB();

    try {
        const products = await Product.find({});
        console.log(`Found ${products.length} products. Updating with filter attributes and subcategories...`);

        if (products.length === 0) {
            console.log('No products to update.');
            return;
        }

        for (const product of products) {
            // Only update if missing or empty, or force update (let's force update to ensure data exists)

            // Randomly assign attributes
            product.brand = getRandomItem(brands);
            product.color = getRandomItem(colors);
            product.fabric = getRandomItem(fabrics);
            product.occasion = getRandomItem(occasions);
            product.fit = getRandomItem(fits);
            product.sizes = getRandomSizes();

            // Improve category if it's generic 'New' or 'Sale' to something more filterable if needed, 
            // but let's respect existing category for now, or maybe ensure gender is set.
            if (!product.gender) product.gender = getRandomItem(['Men', 'Women']);

            // Assign subCategory based on Category/Gender logic
            if (product.category === 'Sneakers') {
                product.subCategory = getRandomItem(sneakersSubCategories);
                const tags = ['street', 'performance', 'bestseller', 'seasonal'];
                product.sneakerTag = getRandomItem(tags);
            } else if (product.category === 'Accessories') {
                product.subCategory = getRandomItem(accessoriesSubCategories);
                const accTags = ['everyday', 'travel', 'minimal', 'bestseller', 'complete-look'];
                product.accessoriesTag = getRandomItem(accTags);
            } else if (product.gender === 'Men') {
                // If category is currently "New" or generic, assign a specific clothes category
                if (['New', 'Sale'].includes(product.category)) {
                    product.category = getRandomItem(menSubCategories);
                }
            } else if (product.gender === 'Women') {
                if (['New', 'Sale'].includes(product.category)) {
                    product.category = getRandomItem(womenSubCategories);
                }
            }

            await product.save();
        }

        console.log('All products updated successfully with filter data.');

    } catch (error) {
        console.error('Error seeding filters:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedFilters();
