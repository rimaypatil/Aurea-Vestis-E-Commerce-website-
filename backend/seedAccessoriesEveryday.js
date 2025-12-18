const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    {
        name: "Minimalist Leather Wallet",
        description: "A sleek, genuine leather wallet for the modern minimalist.",
        price: 999,
        category: "Wallets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Tan",
        images: ["https://images.unsplash.com/photo-1627123424574-18bd75847fae?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Everyday",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.8,
        numReviews: 120,
        countInStock: 60
    },
    {
        name: "Slim RFID Card Holder",
        description: "Protect your cards in style with this slim RFID-blocking holder.",
        price: 699,
        category: "Wallets",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1554188248-986adbb73be0?q=80&w=800&auto=format&fit=crop"],
        fabric: "Aluminum/Leather",
        occasion: "Everyday",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.7,
        numReviews: 95,
        countInStock: 80
    },
    {
        name: "Casual Leather Belt",
        description: "Durable leather belt that pairs perfectly with jeans or chinos.",
        price: 899,
        category: "Belts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Brown",
        images: ["https://images.unsplash.com/photo-1624222244080-8538b719adbb?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Casual",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.6,
        numReviews: 110,
        countInStock: 75
    },
    {
        name: "Reversible Formal–Casual Belt",
        description: "Two looks in one. Black on one side, brown on the other.",
        price: 1199,
        category: "Belts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black/Brown",
        images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop"], // Placeholder for belt
        fabric: "Leather",
        occasion: "Formal",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.8,
        numReviews: 60,
        countInStock: 50
    },
    {
        name: "Classic Analog Watch",
        description: "Timeless design with a clean dial and leather strap.",
        price: 1999,
        category: "Watches",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Silver",
        images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop"],
        fabric: "Stainless Steel",
        occasion: "Everyday",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.9,
        numReviews: 50,
        countInStock: 45
    },
    {
        name: "Lightweight Digital Watch",
        description: "Retro-inspired digital watch. Durable and functional.",
        price: 1299,
        category: "Watches",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Gold",
        images: ["https://images.unsplash.com/photo-1542496658-e33a6d0d50e6?q=80&w=800&auto=format&fit=crop"],
        fabric: "Metal",
        occasion: "Casual",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.5,
        numReviews: 80,
        countInStock: 65
    },
    {
        name: "UV-Protected Sunglasses",
        description: "Keep your eyes safe and stylish with these classic wayfarers.",
        price: 1099,
        category: "Sunglasses",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Tortoise Shell",
        images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"],
        fabric: "Acetate",
        occasion: "Casual",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.7,
        numReviews: 100,
        countInStock: 90
    },
    {
        name: "Blue-Light Blocking Glasses",
        description: "Reduce eye strain from screens with these stylish clear frames.",
        price: 999,
        category: "Accessories", // General Accessories for Glasses
        subCategory: "Eyewear",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Transparent",
        images: ["https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop"],
        fabric: "Plastic",
        occasion: "Work",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.6,
        numReviews: 70,
        countInStock: 55
    },
    {
        name: "Cotton Ankle Socks (Pack of 3)",
        description: "Soft, breathable ankle socks perfect for sneakers.",
        price: 499,
        category: "Accessories",
        subCategory: "Socks",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "White/Grey/Black",
        images: ["https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Everyday",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.8,
        numReviews: 150,
        countInStock: 200
    },
    {
        name: "Breathable Crew Socks",
        description: "Classic crew socks with extra cushioning for all-day comfort.",
        price: 399,
        category: "Accessories",
        subCategory: "Socks",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "White",
        images: ["https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Cotton Blend",
        occasion: "Everyday",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.7,
        numReviews: 110,
        countInStock: 150
    },
    {
        name: "Canvas Tote Bag",
        description: "Durable canvas tote for shopping, beach, or daily commute.",
        price: 799,
        category: "Bags",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Beige",
        images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"],
        fabric: "Canvas",
        occasion: "Casual",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.8,
        numReviews: 90,
        countInStock: 60
    },
    {
        name: "Compact Crossbody Sling Bag",
        description: "Keep your essentials close with this sleek crossbody bag.",
        price: 1499,
        category: "Bags",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Nylon",
        occasion: "Travel",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.7,
        numReviews: 75,
        countInStock: 50
    },
    {
        name: "Simple Stud Earrings",
        description: "Elegant studs that add a subtle sparkle to any outfit.",
        price: 599,
        category: "Jewellery",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Silver",
        images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"],
        fabric: "Sterling Silver",
        occasion: "Everyday",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.9,
        numReviews: 40,
        countInStock: 80
    },
    {
        name: "Minimal Chain Necklace",
        description: "A delicate chain that looks great alone or layered.",
        price: 799,
        category: "Jewellery",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Gold",
        images: ["https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop"],
        fabric: "Gold Plated",
        occasion: "Everyday",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.8,
        numReviews: 55,
        countInStock: 65
    },
    {
        name: "Key Organizer / Key Holder",
        description: "Stop the jingle. Organize your keys in a compact leather holder.",
        price: 499,
        category: "Accessories",
        subCategory: "Organizers",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Brown",
        images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Leather",
        occasion: "Everyday",
        collectionName: "None",
        accessoriesTag: "everyday",
        rating: 4.5,
        numReviews: 60,
        countInStock: 100
    }
];

const seedEverydayAccessories = async () => {
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

        console.log('Everyday Accessories Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding Everyday Accessories:', error);
        process.exit(1);
    }
};

seedEverydayAccessories();
