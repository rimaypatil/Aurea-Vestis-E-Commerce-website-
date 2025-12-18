const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    // --- Co-ords (5 items) ---
    {
        name: "Floral Summer Co-ord Set",
        description: "Breezy floral print crop top and high-waisted shorts. Perfect for beach vacations.",
        price: 3499,
        category: "Co-ords",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Pink",
        sizes: ["XS", "S", "M", "L"],
        images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"],
        fabric: "Rayon",
        occasion: "Casual",
        fit: "Regular",
        rating: 4.5,
        numReviews: 10,
        countInStock: 20
    },
    {
        name: "Knitted Lounge Set",
        description: "Cozy beige knitted sweater and matching wide-leg trousers. Ultimate comfort for home or travel.",
        price: 4999,
        category: "Co-ords",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Beige",
        sizes: ["S", "M", "L", "XL"],
        images: ["https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=800&auto=format&fit=crop"],
        fabric: "Wool Blend",
        occasion: "Casual",
        fit: "Relaxed",
        rating: 4.8,
        numReviews: 25,
        countInStock: 15
    },
    {
        name: "Satin Evening Two-Piece",
        description: "Luxurious emerald green satin top and skirt set. Elegant and sophisticated for evening parties.",
        price: 6999,
        category: "Co-ords",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Green",
        sizes: ["XS", "S", "M", "L"],
        images: ["https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop"],
        fabric: "Satin",
        occasion: "Party",
        fit: "Slim Fit",
        rating: 4.7,
        numReviews: 12,
        countInStock: 10
    },
    {
        name: "Abstract Print Blazer Set",
        description: "Modern abstract print blazer and trouser set. A bold statement for the workplace or events.",
        price: 8999,
        category: "Co-ords",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Multicolor",
        sizes: ["S", "M", "L"],
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"],
        fabric: "Polyester",
        occasion: "Formal",
        fit: "Regular",
        rating: 4.6,
        numReviews: 8,
        countInStock: 12
    },
    {
        name: "Linen Crop & Skirt Set",
        description: "Breathable white linen crop top with a flowing midi skirt. Essential for hot summer days.",
        price: 4499,
        category: "Co-ords",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "White",
        sizes: ["XS", "S", "M", "L", "XL"],
        images: ["https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop"],
        fabric: "Linen",
        occasion: "Casual",
        fit: "Regular",
        rating: 4.9,
        numReviews: 18,
        countInStock: 25
    },

    // --- Bags (5 items) ---
    {
        name: "Classic Leather Tote",
        description: "Spacious tan leather tote bag. Perfect for work and daily essentials.",
        price: 5999,
        category: "Bags",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Tan",
        sizes: ["One Size"],
        images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Casual",
        fit: "Standard",
        rating: 4.7,
        numReviews: 30,
        countInStock: 20
    },
    {
        name: "Quilted Chain Shoulder Bag",
        description: "Chic black quilted bag with a gold chain strap. Adds a touch of glamour to any outfit.",
        price: 4999,
        category: "Bags",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Black",
        sizes: ["One Size"],
        images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"],
        fabric: "Faux Leather",
        occasion: "Party",
        fit: "Standard",
        rating: 4.8,
        numReviews: 45,
        countInStock: 15
    },
    {
        name: "Canvas Beach Bag",
        description: "Large striped canvas bag with rope handles. Durable and stylish for beach days.",
        price: 2499,
        category: "Bags",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Blue",
        sizes: ["One Size"],
        images: ["https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop"],
        fabric: "Canvas",
        occasion: "Casual",
        fit: "Standard",
        rating: 4.5,
        numReviews: 22,
        countInStock: 30
    },
    {
        name: "Minimalist Crossbody",
        description: "Sleek and compact crossbody bag in pastel pink. Great for keeping hands free.",
        price: 3499,
        category: "Bags",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Pink",
        sizes: ["One Size"],
        images: ["https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Casual",
        fit: "Standard",
        rating: 4.6,
        numReviews: 28,
        countInStock: 18
    },
    {
        name: "Structured Work Satchel",
        description: "Professional structured satchel in deep burgundy. Fits a tablet and documents easily.",
        price: 6499,
        category: "Bags",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Red",
        sizes: ["One Size"],
        images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"],
        fabric: "Faux Leather",
        occasion: "Formal",
        fit: "Standard",
        rating: 4.8,
        numReviews: 14,
        countInStock: 10
    },

    // --- Footwear (5 items) ---
    {
        name: "Classic Stiletto Heels",
        description: "Timeless black pointed-toe stilettos. The ultimate power shoe for any occasion.",
        price: 5999,
        category: "Footwear",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Black",
        sizes: ["6", "7", "8", "9"],
        images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Party",
        fit: "Standard",
        rating: 4.7,
        numReviews: 50,
        countInStock: 25
    },
    {
        name: "Strappy Summer Sandals",
        description: "Gold metallic strappy sandals. Comfortable and chic for summer outings.",
        price: 2999,
        category: "Footwear",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Gold",
        sizes: ["5", "6", "7", "8", "9"],
        images: ["https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800&auto=format&fit=crop"],
        fabric: "Synthetic",
        occasion: "Casual",
        fit: "Standard",
        rating: 4.5,
        numReviews: 35,
        countInStock: 40
    },
    {
        name: "White Leather Sneakers",
        description: "Clean white minimalist sneakers. Versatile essentials for everyday wear.",
        price: 4999,
        category: "Footwear",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "White",
        sizes: ["6", "7", "8", "9"],
        images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Casual",
        fit: "Standard",
        rating: 4.8,
        numReviews: 60,
        countInStock: 30
    },
    {
        name: "Ankle Boots",
        description: "Stylish suede ankle boots in taupe. Perfect for transitional weather.",
        price: 6999,
        category: "Footwear",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Beige",
        sizes: ["6", "7", "8", "9"],
        images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop"],
        fabric: "Suede",
        occasion: "Casual",
        fit: "Standard",
        rating: 4.6,
        numReviews: 20,
        countInStock: 15
    },
    {
        name: "Block Heel Mules",
        description: "Comfortable block heel mules in tan. Effortlessly stylish for work or brunch.",
        price: 4499,
        category: "Footwear",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Tan",
        sizes: ["6", "7", "8", "9"],
        images: ["https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Formal",
        fit: "Standard",
        rating: 4.7,
        numReviews: 15,
        countInStock: 20
    }
];

const seedWomenCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        for (const product of products) {
            await Product.findOneAndUpdate(
                { name: product.name },
                product,
                { upsert: true, new: true }
            );
            console.log(`Seeded: ${product.name}`);
        }

        console.log('All Women Products Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding women products:', error);
        process.exit(1);
    }
};

seedWomenCategories();
