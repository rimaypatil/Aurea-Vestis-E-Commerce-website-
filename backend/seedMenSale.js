const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');

dotenv.config();

const menSaleProducts = [
    {
        name: "Urban Graphic Tee",
        description: "Bold graphic tee with 50% off.",
        price: 999, // Original approx 2000
        gender: "Men",
        category: "T-Shirts",
        brand: "Aurea Vestis",
        stock: 50,
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"],
        parentCategory: "men",
        isOnSale: true,
        discount: 50,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Classic Slim Jeans",
        description: "Premium denim at half price.",
        price: 1499,
        gender: "Men",
        category: "Jeans",
        brand: "Levi's",
        stock: 30,
        images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop"],
        parentCategory: "men",
        isOnSale: true,
        discount: 50,
        sizes: ["30", "32", "34", "36"]
    },
    {
        name: "Bomber Jacket",
        description: "Essential outerwear now 50% off.",
        price: 2499,
        gender: "Men",
        category: "Jackets",
        brand: "Zara",
        stock: 20,
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"],
        parentCategory: "men",
        isOnSale: true,
        discount: 50,
        sizes: ["M", "L", "XL"]
    },
    {
        name: "Canvas Sneakers",
        description: "Casual kicks for everyday.",
        price: 1249,
        gender: "Men",
        category: "Sneakers",
        brand: "Converse",
        stock: 40,
        images: ["https://images.unsplash.com/photo-1560769629-975e53fa58e9?q=80&w=800&auto=format&fit=crop"],
        parentCategory: "men",
        isOnSale: true,
        discount: 50,
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10"]
    },
    {
        name: "Oxford Shirt",
        description: "Formal crisp shirt.",
        price: 1199,
        gender: "Men",
        category: "Shirts",
        brand: "H&M",
        stock: 35,
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop"],
        parentCategory: "men",
        isOnSale: true,
        discount: 50,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        name: "Street Hoodie",
        description: "Comfortable hoodie for street style.",
        price: 1799,
        gender: "Men",
        category: "Hoodies",
        brand: "Nike",
        stock: 25,
        images: ["https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=800&auto=format&fit=crop"],
        parentCategory: "men",
        isOnSale: true,
        discount: 50,
        sizes: ["M", "L", "XL"]
    },

    {
        name: "Leather Belt",
        description: "Genuine leather accessory.",
        price: 749,
        gender: "Men",
        category: "Accessories",
        brand: "Tommy Hilfiger",
        stock: 60,
        images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop"],
        parentCategory: "men",
        isOnSale: true,
        discount: 50,
        sizes: ["M", "L"]
    }
];

const seedMenSale = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Delete existing men's 50% items to avoid duplicates if re-run (optional, but cleaner for demo)
        // await Product.deleteMany({ gender: 'Men', discount: 50 }); 

        await Product.insertMany(menSaleProducts);
        console.log('Seeded Men Sale Products');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedMenSale();
