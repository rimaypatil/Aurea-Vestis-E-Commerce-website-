const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./src/models/Product');

dotenv.config({ path: path.join(__dirname, '.env') });

const womenProducts = [
    // DRESSES
    {
        name: "Floral Summer Maxi Dress",
        description: "Breezy floral print maxi dress perfect for summer days.",
        price: 2999,
        category: "Dresses",
        parentCategory: "women",
        gender: "Women",
        brand: "Aurea Bloom",
        sizes: ["XS", "S", "M", "L", "XL"],
        color: "Pink",
        fabric: "Viscose",
        fit: "Relaxed",
        occasion: "Casual",
        stock: 45,
        rating: 4.8,
        numReviews: 120,
        images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: true
    },
    {
        name: "Elegant Black Cocktail Dress",
        description: "Timeless little black dress for evening events.",
        price: 4599,
        category: "Dresses",
        parentCategory: "women",
        gender: "Women",
        brand: "Evening Muse",
        sizes: ["S", "M", "L"],
        color: "Black",
        fabric: "Polyester",
        fit: "Slim Fit",
        occasion: "Party",
        stock: 20,
        rating: 4.9,
        numReviews: 85,
        images: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },
    {
        name: "Boho Chic Midi Dress",
        description: "Bohemian style midi dress with intricate embroidery.",
        price: 3499,
        category: "Dresses",
        parentCategory: "women",
        gender: "Women",
        brand: "Free Spirit",
        sizes: ["S", "M", "L", "XL"],
        color: "White",
        fabric: "Cotton",
        fit: "Relaxed",
        occasion: "Casual",
        stock: 30,
        rating: 4.5,
        numReviews: 60,
        images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },
    {
        name: "Red Wrap Dress",
        description: "Flattering wrap dress in a bold red hue.",
        price: 2799,
        category: "Dresses",
        parentCategory: "women",
        gender: "Women",
        brand: "Urban Chic",
        sizes: ["XS", "S", "M", "L"],
        color: "Red",
        fabric: "Blended",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 25,
        rating: 4.6,
        numReviews: 95,
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },
    {
        name: "Denim Pinafore Dress",
        description: "Casual denim pinafore, great for layering.",
        price: 2299,
        category: "Dresses",
        parentCategory: "women",
        gender: "Women",
        brand: "Denim Co",
        sizes: ["S", "M", "L"],
        color: "Blue",
        fabric: "Denim",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 40,
        rating: 4.4,
        numReviews: 50,
        images: ["https://images.unsplash.com/photo-1591369045385-115dd2902589?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: false
    },

    // TOPS & T-SHIRTS & SHIRTS
    {
        name: "Classic White Silk Shirt",
        description: "Luxurious silk shirt for a polished office look.",
        price: 3999,
        category: "Shirts",
        parentCategory: "women",
        gender: "Women",
        brand: "Aurea Formal",
        sizes: ["S", "M", "L", "XL"],
        color: "White",
        fabric: "Silk",
        fit: "Regular Fit",
        occasion: "Formal",
        stock: 15,
        rating: 4.7,
        numReviews: 40,
        images: ["https://images.unsplash.com/photo-1598554060856-7d8a348b6745?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },
    {
        name: "Vintage Graphic Tee",
        description: "Soft cotton tee with vintage inspired graphic.",
        price: 1299,
        category: "T-Shirts", // Mapped to T-Shirts
        parentCategory: "women",
        gender: "Women",
        brand: "Retro Vibes",
        sizes: ["S", "M", "L", "XL"],
        color: "Black",
        fabric: "Cotton",
        fit: "Relaxed",
        occasion: "Casual",
        stock: 50,
        rating: 4.5,
        numReviews: 150,
        images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: true
    },
    {
        name: "Striped Linen Shirt",
        description: "Breathable linen shirt with vertical stripes.",
        price: 2499,
        category: "Shirts",
        parentCategory: "women",
        gender: "Women",
        brand: "Coastal Vibe",
        sizes: ["S", "M", "L"],
        color: "Blue",
        fabric: "Linen",
        fit: "Relaxed",
        occasion: "Casual",
        stock: 30,
        rating: 4.6,
        numReviews: 70,
        images: ["https://images.unsplash.com/photo-1551163943-3f6a29e3d0ca?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },
    {
        name: "Crop Top with Puff Sleeves",
        description: "Trendy crop top with statement puff sleeves.",
        price: 1499,
        category: "Tops",
        parentCategory: "women",
        gender: "Women",
        brand: "Urban Chic",
        sizes: ["XS", "S", "M", "L"],
        color: "Pink",
        fabric: "Cotton",
        fit: "Slim Fit",
        occasion: "Casual",
        stock: 35,
        rating: 4.4,
        numReviews: 90,
        images: ["https://images.unsplash.com/photo-1623930154261-37f8b293c059?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },
    {
        name: "Satin Cami Top",
        description: "Elegant satin camisole, great for layering or evening wear.",
        price: 1199,
        category: "Tops",
        parentCategory: "women",
        gender: "Women",
        brand: "Evening Muse",
        sizes: ["XS", "S", "M", "L"],
        color: "Beige",
        fabric: "Satin",
        fit: "Regular Fit",
        occasion: "Party",
        stock: 25,
        rating: 4.5,
        numReviews: 55,
        images: ["https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },

    // JEANS & TROUSERS & SKIRTS
    {
        name: "High-Waisted Skinny Jeans",
        description: "Classic high-waisted skinny jeans with stretch.",
        price: 2999,
        category: "Jeans",
        parentCategory: "women",
        gender: "Women",
        brand: "Denim Co",
        sizes: ["26", "28", "30", "32"],
        color: "Blue",
        fabric: "Denim",
        fit: "Skinny",
        occasion: "Casual",
        stock: 60,
        rating: 4.7,
        numReviews: 200,
        images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: true
    },
    {
        name: "Wide Leg Trousers",
        description: "Sophisticated wide leg trousers for a chic silhouette.",
        price: 3499,
        category: "Trousers",
        parentCategory: "women",
        gender: "Women",
        brand: "Aurea Formal",
        sizes: ["26", "28", "30", "32"],
        color: "Beige",
        fabric: "Polyester",
        fit: "Relaxed",
        occasion: "Formal",
        stock: 20,
        rating: 4.6,
        numReviews: 45,
        images: ["https://images.unsplash.com/photo-1509551383199-d16021d66a59?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },
    {
        name: "Mom Jeans",
        description: "Retro-inspired mom fit jeans for a relaxed look.",
        price: 2799,
        category: "Jeans",
        parentCategory: "women",
        gender: "Women",
        brand: "Retro Vibes",
        sizes: ["26", "28", "30", "32"],
        color: "Blue",
        fabric: "Denim",
        fit: "Relaxed",
        occasion: "Casual",
        stock: 40,
        rating: 4.5,
        numReviews: 110,
        images: ["https://images.unsplash.com/photo-1584370848010-d7cc637703e6?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: false
    },
    {
        name: "Pleated Midi Skirt",
        description: "Elegant pleated midi skirt in metallic finish.",
        price: 2599,
        category: "Skirts",
        parentCategory: "women",
        gender: "Women",
        brand: "Evening Muse",
        sizes: ["S", "M", "L"],
        color: "Gold",
        fabric: "Polyester",
        fit: "Regular Fit",
        occasion: "Party",
        stock: 25,
        rating: 4.8,
        numReviews: 75,
        images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },
    {
        name: "Active Leggings",
        description: "High-performance leggings for yoga and gym.",
        price: 1899,
        category: "Activewear", // Mapping to Trousers/Pants loosely or separate cat
        parentCategory: "women",
        gender: "Women",
        brand: "Active Life",
        sizes: ["XS", "S", "M", "L"],
        color: "Black",
        fabric: "Spandex",
        fit: "Skinny",
        occasion: "Sports",
        stock: 50,
        rating: 4.8,
        numReviews: 180,
        images: ["https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: true
    },

    // JACKETS & COATS
    {
        name: "Classic Beige Trench Coat",
        description: "Timeless trench coat, a wardrobe essential.",
        price: 6999,
        category: "Jackets",
        parentCategory: "women",
        gender: "Women",
        brand: "Aurea Formal",
        sizes: ["S", "M", "L", "XL"],
        color: "Beige",
        fabric: "Cotton",
        fit: "Regular Fit",
        occasion: "Formal",
        stock: 15,
        rating: 4.9,
        numReviews: 65,
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800"], // Reusing accurate jacket image
        isNewArrival: false
    },
    {
        name: "Denim Jacket",
        description: "Versatile denim jacket with faded wash.",
        price: 3299,
        category: "Jackets",
        parentCategory: "women",
        gender: "Women",
        brand: "Denim Co",
        sizes: ["S", "M", "L", "XL"],
        color: "Blue",
        fabric: "Denim",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 30,
        rating: 4.6,
        numReviews: 120,
        images: ["https://images.unsplash.com/photo-1527027376778-99778ae7486e?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: true
    },
    {
        name: "Faux Leather Biker Jacket",
        description: "Edgy biker jacket to add attitude to any outfit.",
        price: 4999,
        category: "Jackets",
        parentCategory: "women",
        gender: "Women",
        brand: "Urban Edge",
        sizes: ["S", "M", "L"],
        color: "Black",
        fabric: "Leather",
        fit: "Slim Fit",
        occasion: "Streetwear",
        stock: 20,
        rating: 4.7,
        numReviews: 85,
        images: ["https://images.unsplash.com/photo-1551028726-001632873199?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },

    // CO-ORDS & ACTIVEWEAR
    {
        name: "Yoga Set",
        description: "Matching sports bra and leggings set.",
        price: 3499,
        category: "Co-ords",
        parentCategory: "women",
        gender: "Women",
        brand: "Active Life",
        sizes: ["S", "M", "L"],
        color: "Blue",
        fabric: "Spandex",
        fit: "Skinny",
        occasion: "Sports",
        stock: 25,
        rating: 4.8,
        numReviews: 70,
        images: ["https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },
    {
        name: "Linen Blazer Set",
        description: "Chic linen blazer and shorts co-ord set.",
        price: 5999,
        category: "Co-ords",
        parentCategory: "women",
        gender: "Women",
        brand: "Aurea Bloom",
        sizes: ["S", "M", "L"],
        color: "White",
        fabric: "Linen",
        fit: "Relaxed",
        occasion: "Formal",
        stock: 12,
        rating: 4.7,
        numReviews: 30,
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800"], // Reuse appropriate image
        isNewArrival: true
    },

    // EXTRA ITEMS TO REACH 25
    {
        name: "Oversized Knitted Sweater",
        description: "Cozy oversized sweater for winter days.",
        price: 3299,
        category: "Sweaters",
        parentCategory: "women",
        gender: "Women",
        brand: "Cozy Life",
        sizes: ["S", "M", "L", "XL"],
        color: "Grey",
        fabric: "Wool",
        fit: "Oversized",
        occasion: "Casual",
        stock: 20,
        rating: 4.8,
        numReviews: 90,
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: false
    },
    {
        name: "Floral Blouse",
        description: "Delicate floral print blouse with ruffle details.",
        price: 1999,
        category: "Tops",
        parentCategory: "women",
        gender: "Women",
        brand: "Aurea Bloom",
        sizes: ["S", "M", "L", "XL"],
        color: "Multi",
        fabric: "Viscose",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 30,
        rating: 4.5,
        numReviews: 55,
        images: ["https://images.unsplash.com/photo-1564257631407-4deb1f99d8b2?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },
    {
        name: "Black Skinny Belt",
        description: "Essential black belt to accessorize your outfit.",
        price: 799,
        category: "Accessories",
        parentCategory: "women",
        gender: "Women",
        brand: "Urban Chic",
        sizes: ["Standard"],
        color: "Black",
        fabric: "Leather",
        fit: "None",
        occasion: "Casual",
        stock: 100,
        rating: 4.4,
        numReviews: 200,
        images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: false
    },
    {
        name: "Silk Scarf",
        description: "Printed silk scarf to add a pop of color.",
        price: 1299,
        category: "Accessories",
        parentCategory: "women",
        gender: "Women",
        brand: "Aurea Bloom",
        sizes: ["Standard"],
        color: "Multi",
        fabric: "Silk",
        fit: "None",
        occasion: "Formal",
        stock: 50,
        rating: 4.6,
        numReviews: 40,
        images: ["https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },
    {
        name: "Running Shorts",
        description: "Lightweight running shorts with breathable fabric.",
        price: 1599,
        category: "Activewear",
        parentCategory: "women",
        gender: "Women",
        brand: "Active Life",
        sizes: ["S", "M", "L"],
        color: "Pink",
        fabric: "Polyester",
        fit: "Regular Fit",
        occasion: "Sports",
        stock: 40,
        rating: 4.7,
        numReviews: 60,
        images: ["https://images.unsplash.com/photo-1538805060504-d141e4c760cd?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: false
    }
];

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

const seedProducts = async () => {
    try {
        await connectDB();

        // Let's be smarter: check if product exists by name.
        let addedCount = 0;
        for (const product of womenProducts) {
            const result = await Product.findOneAndUpdate(
                { name: product.name },
                product,
                { new: true, upsert: true }
            );
            addedCount++;
        }

        console.log(`Imported ${addedCount} new Women's products!`);
        process.exit();
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
};

seedProducts();
