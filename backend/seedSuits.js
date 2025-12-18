const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const suits = [
    {
        name: "Classic Navy Blue Slim Fit Suit",
        description: "A timeless navy blue suit tailored for a modern slim fit. Perfect for business meetings and formal events.",
        price: 12999,
        category: "Suits",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Blue",
        sizes: ["38", "40", "42", "44"],
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"],
        fabric: "Wool Blend",
        occasion: "Formal",
        fit: "Slim Fit",
        rating: 4.8,
        numReviews: 12,
        countInStock: 10
    },
    {
        name: "Charcoal Grey Wool Suit",
        description: "Premium charcoal grey suit crafted from high-quality wool. Features a two-button jacket and flat-front trousers.",
        price: 14999,
        category: "Suits",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Grey",
        sizes: ["38", "40", "42", "44", "46"],
        images: ["https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop"],
        fabric: "100% Wool",
        occasion: "Formal",
        fit: "Regular",
        rating: 4.9,
        numReviews: 8,
        countInStock: 8
    },
    {
        name: "Black Tuxedo Set",
        description: "Elegant black tuxedo with satin lapels. The ultimate choice for black-tie events and weddings.",
        price: 18999,
        category: "Suits",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        sizes: ["38", "40", "42"],
        images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"],
        fabric: "Silk Blend",
        occasion: "Party",
        fit: "Slim Fit",
        rating: 5.0,
        numReviews: 15,
        countInStock: 5
    },
    {
        name: "Beige Linen Summer Suit",
        description: "Lightweight beige linen suit, ideal for summer weddings and outdoor parties. Breathable and stylish.",
        price: 9999,
        category: "Suits",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Beige",
        sizes: ["36", "38", "40", "42"],
        images: ["https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?q=80&w=800&auto=format&fit=crop"],
        fabric: "Linen",
        occasion: "Casual",
        fit: "Relaxed",
        rating: 4.6,
        numReviews: 20,
        countInStock: 15
    },
    {
        name: "Checkered Grey 3-Piece Suit",
        description: "Sophisticated 3-piece suit with a subtle checkered pattern. Includes jacket, waistcoat, and trousers.",
        price: 16499,
        category: "Suits",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Grey",
        sizes: ["38", "40", "42", "44"],
        images: ["https://images.unsplash.com/photo-1548126032-079a0fb0099f?q=80&w=800&auto=format&fit=crop"],
        fabric: "Viscose Blend",
        occasion: "Formal",
        fit: "Tailored",
        rating: 4.7,
        numReviews: 10,
        countInStock: 7
    }
];

const seedSuits = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        for (const suit of suits) {
            await Product.findOneAndUpdate(
                { name: suit.name },
                suit,
                { upsert: true, new: true }
            );
            console.log(`Seeded: ${suit.name}`);
        }

        console.log('All Suits Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding suits:', error);
        process.exit(1);
    }
};

seedSuits();
