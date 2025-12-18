const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

// Safe List of Category-Specific Images
const IMAGE_LIBRARY = {
    men: {
        'T-Shirts': [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
        ],
        'Jeans': [
            "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1555689502-c4b22b7abc53?q=80&w=800&auto=format&fit=crop"
        ],
        'Jackets': [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551028919-383718cccf35?q=80&w=800&auto=format&fit=crop"
        ],
        'Shirts': [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1603252109303-2751440efa43?q=80&w=800&auto=format&fit=crop"
        ],
        'Hoodies': [
            "https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=800&auto=format&fit=crop"
        ],
        'Accessories': [
            "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop" // Belt/General
        ],
        'default': "https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=800&auto=format&fit=crop"
    },
    women: {
        'Tops': [
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1564257631407-4deb1f99d8b2?q=80&w=800&auto=format&fit=crop"
        ],
        'Dresses': [
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"
        ],
        'Ethnic Wear': [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop"
        ],
        'Skirts': [
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548624147-93b4ceb59330?q=80&w=800&auto=format&fit=crop"
        ],
        'Jeans': [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584370848010-d7cc637703e6?q=80&w=800&auto=format&fit=crop"
        ],
        'Activewear': [
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1549497557-d54cd5f5fa64?q=80&w=800&auto=format&fit=crop"
        ],
        'default': "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop"
    },
    sneakers: {
        'Casual Sneakers': [
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop"
        ],
        'Running': [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800&auto=format&fit=crop"
        ],
        'Streetwear': [
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=800&auto=format&fit=crop"
        ],
        'default': "https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=800&auto=format&fit=crop"
    },
    accessories: {
        'Bags': [
            "https://images.unsplash.com/photo-1590874103328-eac65d684363?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"
        ],
        'Watches': [
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop"
        ],
        'Jewellery': [
            "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
        ],
        'Sunglasses': [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"
        ],
        'Hats': [
            "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800&auto=format&fit=crop"
        ],
        'default': "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop"
    }
};

const standardizeImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Fetch all products
        const products = await Product.find({});
        console.log(`Processing ${products.length} products...`);

        let updatedCount = 0;
        let skippedLocalCount = 0;

        for (const product of products) {
            // SKIP condition: If image is a local upload (starts with /images/), preserve it.
            if (product.images && product.images.length > 0 && product.images[0].startsWith('/images/')) {
                // console.log(`Skipping local image for: ${product.name}`);
                skippedLocalCount++;
                continue;
            }

            // --- DATA SANITIZATION START ---

            // 1. Parent Category
            if (!product.parentCategory) {
                if (product.gender === 'Men') product.parentCategory = 'men';
                else if (product.gender === 'Women') product.parentCategory = 'women';
                else if (product.category === 'Sneakers') product.parentCategory = 'unisex';
                else product.parentCategory = 'men';
            }

            // 2. Fit
            const validFits = ['Slim Fit', 'Regular Fit', 'Oversized', 'Skinny', 'Tapered', 'Relaxed', 'None'];
            if (!validFits.includes(product.fit)) {
                if (product.fit === 'High Top' || product.fit === 'Low Top') product.fit = 'Regular Fit';
                else if (product.fit === 'Loose') product.fit = 'Relaxed';
                else if (product.fit === 'Straight') product.fit = 'Regular Fit';
                else if (product.fit === 'Slim') product.fit = 'Slim Fit';
                else product.fit = 'None';
            }

            // 3. Occasion
            const validOccasions = ['Casual', 'Formal', 'Party', 'Sports', 'Streetwear', 'None'];
            if (product.occasion && !validOccasions.includes(product.occasion)) {
                if (product.occasion === 'Travel' || product.occasion === 'Daily' || product.occasion === 'Summer' || product.occasion === 'Winter' || product.occasion === 'Special') product.occasion = 'Casual';
                else if (product.occasion === 'Wedding' || product.occasion === 'Evening') product.occasion = 'Party';
                else product.occasion = 'None';
            }

            // 4. Category
            const validCategories = [
                'T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets', 'Hoodies', 'Sweaters', 'Co-ords',
                'Dresses', 'Tops', 'Ethnic Wear', 'Skirts', 'Co-Ords', 'Activewear',
                'Sneakers', 'Accessories', 'Bags', 'Footwear', 'Wallets', 'Belts', 'Perfume', 'Watches', 'Jewellery', 'Sunglasses', 'Hats',
                'New', 'Sale'
            ];

            if (product.category === 'Suits') product.category = 'Co-ords';
            if (product.category === 'Footwear' && product.subCategory === 'Socks') product.category = 'Accessories';
            if (!validCategories.includes(product.category)) {
                product.category = 'New';
            }

            // --- DATA SANITIZATION END ---

            // Determine correct library category
            let library = null;
            let categoryKey = null;

            // Normalize classification
            const gender = (product.gender || "").toLowerCase();
            const parentCat = (product.parentCategory || "").toLowerCase();
            const cat = product.category || "";
            const subCat = product.subCategory || "";

            // Logic to select library
            if (parentCat === 'sneakers' || cat === 'Sneakers') {
                library = IMAGE_LIBRARY.sneakers;
                categoryKey = subCat || 'default';
            } else if (parentCat === 'men' || gender === 'men') {
                library = IMAGE_LIBRARY.men;
                categoryKey = cat;
            } else if (parentCat === 'women' || gender === 'women') {
                library = IMAGE_LIBRARY.women;
                categoryKey = cat;
            } else {
                // Accessories or Unisex default
                if (IMAGE_LIBRARY.accessories[cat]) {
                    library = IMAGE_LIBRARY.accessories;
                    categoryKey = cat;
                } else {
                    // Fallback logic
                    if (cat === 'Bags' || cat === 'Wallets' || cat === 'Belts') {
                        library = IMAGE_LIBRARY.accessories;
                        categoryKey = cat;
                    } else {
                        // Default to men's miscellaneous if unsure
                        library = IMAGE_LIBRARY.men;
                        categoryKey = 'default';
                    }
                }
            }

            // Match specific subcategory/category in library
            let targetImages = library[categoryKey] || library['default'] || IMAGE_LIBRARY.men['default'];

            if (typeof targetImages === 'string') targetImages = [targetImages];

            // Pick an image deterministically
            const newImage = targetImages[product.name.length % targetImages.length];

            // Update
            if (!product.images || product.images[0] !== newImage) {
                product.images = [newImage];
                await product.save();
                updatedCount++;
            }
        }

        console.log(`\nStandardization Complete.`);
        console.log(`Total Products Processed: ${products.length}`);
        console.log(`Local Images Preserved: ${skippedLocalCount}`);
        console.log(`External Images Updated/Standardized: ${updatedCount}`);

        process.exit();
    } catch (error) {
        console.error('Error standardizing images:', error);
        process.exit(1);
    }
};

standardizeImages();
