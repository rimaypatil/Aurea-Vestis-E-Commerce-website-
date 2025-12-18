const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    {
        name: "Wallet + Belt Combo (Leather)",
        description: "A classic leather wallet and belt set. The perfect gift for him.",
        price: 1499,
        category: "Accessories",
        subCategory: "Wallet & Belt",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Brown",
        images: ["https://images.unsplash.com/photo-1624222244080-8538b719adbb?q=80&w=800&auto=format&fit=crop"],
        fabric: "Genuine Leather",
        occasion: "Formal",
        collectionName: "None",
        accessoriesTag: "complete-look",
        rating: 4.8,
        numReviews: 45,
        countInStock: 50
    },
    {
        name: "Watch + Bracelet Set",
        description: "Elegant minimalist watch paired with a matching bracelet.",
        price: 2499,
        category: "Watches",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Rose Gold",
        images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Metal Alloy",
        occasion: "Party",
        collectionName: "None",
        accessoriesTag: "complete-look",
        rating: 4.9,
        numReviews: 60,
        countInStock: 40
    },
    {
        name: "Sunglasses + Protective Case Set",
        description: "Stylish aviators with a premium hard-shell protective case.",
        price: 1299,
        category: "Sunglasses",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop"],
        fabric: "Acetate",
        occasion: "Casual",
        collectionName: "None",
        accessoriesTag: "complete-look",
        rating: 4.7,
        numReviews: 80,
        countInStock: 70
    },
    {
        name: "Cap + Sunglasses Streetwear Set",
        description: "The ultimate street combo: a snapback cap and trendy shades.",
        price: 999,
        category: "Hats",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Streetwear",
        collectionName: "None",
        accessoriesTag: "complete-look",
        rating: 4.6,
        numReviews: 55,
        countInStock: 60
    },
    {
        name: "Scarf + Gloves Winter Set",
        description: "Stay warm in style with this matching wool scarf and gloves set.",
        price: 1199,
        category: "Accessories",
        subCategory: "Winter Accessories",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1608234808654-2a8bceb40884?q=80&w=800&auto=format&fit=crop"],
        fabric: "Wool Blend",
        occasion: "Casual",
        collectionName: "None",
        accessoriesTag: "complete-look",
        rating: 4.8,
        numReviews: 30,
        countInStock: 45
    },
    {
        name: "Perfume + Travel Spray Set",
        description: "Your signature scent, now with a travel-friendly mini spray.",
        price: 2999,
        category: "Perfume",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Gold",
        images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop"],
        fabric: "Glass",
        occasion: "Party",
        collectionName: "None",
        accessoriesTag: "complete-look",
        rating: 4.9,
        numReviews: 25,
        countInStock: 30
    },
    {
        name: "Jewellery Set (Chain + Ring)",
        description: "A minimal silver chain paired with a matching signet ring.",
        price: 899,
        category: "Jewellery",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Silver",
        images: ["https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop"],
        fabric: "Sterling Silver Plated",
        occasion: "Casual",
        collectionName: "None",
        accessoriesTag: "complete-look",
        rating: 4.5,
        numReviews: 40,
        countInStock: 55
    },
    {
        name: "Backpack + Pouch Combo Set",
        description: "Functional daily backpack with an organized tech pouch.",
        price: 1899,
        category: "Bags",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Navy",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"],
        fabric: "Canvas",
        occasion: "Casual",
        collectionName: "None",
        accessoriesTag: "complete-look",
        rating: 4.7,
        numReviews: 65,
        countInStock: 50
    },
    {
        name: "Socks (Pack of 3) + Shoe Care Kit",
        description: "Premium cotton socks pack with essential shoe cleaning tools.",
        price: 699,
        category: "Accessories",
        subCategory: "Socks & Care",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Multicolor",
        images: ["https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Casual",
        collectionName: "None",
        accessoriesTag: "complete-look",
        rating: 4.6,
        numReviews: 90,
        countInStock: 100
    },
    {
        name: "Tie + Pocket Square Formal Set",
        description: "Silk tie and pocket square set for the refined gentleman.",
        price: 999,
        category: "Accessories",
        subCategory: "Formal Wear",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Burgundy",
        images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop"],
        fabric: "Silk",
        occasion: "Formal",
        collectionName: "None",
        accessoriesTag: "complete-look",
        rating: 4.8,
        numReviews: 35,
        countInStock: 40
    }
];

const seedCompleteTheLook = async () => {
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

        console.log('Complete The Look Items Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding Complete The Look:', error);
        process.exit(1);
    }
};

seedCompleteTheLook();
