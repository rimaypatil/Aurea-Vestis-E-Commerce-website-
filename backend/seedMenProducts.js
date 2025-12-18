const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');

// Load env vars
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
// The file structure shows: backend/.env
// seedMenProducts is in backend/seedMenProducts.js? No, I created it at c:\Users\rimay\OneDrive\Desktop\E-Commerce\backend\seedMenProducts.js
// So __dirname is backend/
// So path should be path.join(__dirname, '.env')

const menProducts = [
    {
        name: "Classic White Oversized Tee",
        description: "Premium cotton oversized t-shirt for a relaxed, urban look.",
        price: 999,
        category: "T-Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "Aurea Basics",
        sizes: ["S", "M", "L", "XL"],
        color: "White",
        fabric: "Cotton",
        fit: "Oversized",
        occasion: "Casual",
        stock: 50,
        rating: 4.5,
        numReviews: 120,
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false,
        isBestSeller: true
    },
    {
        name: "Midnight Black Crew Neck",
        description: "Essential black tee crafted from breathable organic cotton.",
        price: 899,
        category: "T-Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "Urban Edge",
        sizes: ["S", "M", "L", "XXL"],
        color: "Black",
        fabric: "Cotton",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 80,
        rating: 4.7,
        numReviews: 340,
        images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true,
        isBestSeller: true
    },
    {
        name: "Vintage Wash Graphic Tee",
        description: "Graphic print t-shirt with a vintage wash finish.",
        price: 1299,
        category: "T-Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "Street Icons",
        sizes: ["M", "L", "XL"],
        color: "Grey",
        fabric: "Cotton",
        fit: "Oversized",
        occasion: "Streetwear",
        stock: 30,
        rating: 4.2,
        numReviews: 45,
        images: ["https://images.unsplash.com/photo-1756665606795-e2c9d715352b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJiYW4lMjB0ZWV8ZW58MHx8MHx8fDA%3D"],
        isNewArrival: true
    },

    // SHIRTS
    {
        name: "Oxford Blue Formal Shirt",
        description: "Crisp cotton oxford shirt perfect for office and formal events.",
        price: 2499,
        category: "Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "Aurea Formal",
        sizes: ["S", "M", "L", "XL", "XXL"],
        color: "Blue",
        fabric: "Cotton",
        fit: "Slim Fit",
        occasion: "Formal",
        stock: 40,
        rating: 4.6,
        numReviews: 89,
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: true
    },
    {
        name: "Linen Blend Summer Shirt",
        description: "Lightweight linen shirt in beige, ideal for summer days.",
        price: 2199,
        category: "Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "Coastal Vibe",
        sizes: ["M", "L", "XL"],
        color: "Beige",
        fabric: "Linen",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 25,
        rating: 4.4,
        numReviews: 60,
        images: ["https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },
    {
        name: "Checkered Flannel Shirt",
        description: "Soft flannel shirt with classic red and black checks.",
        price: 1899,
        category: "Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "Woodsmen",
        sizes: ["S", "M", "L", "XL"],
        color: "Red",
        fabric: "Cotton",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 35,
        rating: 4.8,
        numReviews: 150,
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: false
    },
    {
        name: "Vertical Stripe Casual Shirt",
        description: "Modern striped shirt for a sharp casual look.",
        price: 1599,
        category: "Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "Urban Edge",
        sizes: ["S", "M", "L"],
        color: "White",
        fabric: "Blended",
        fit: "Slim Fit",
        occasion: "Casual",
        stock: 20,
        rating: 4.0,
        numReviews: 22,
        images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },

    // JEANS
    {
        name: "Classic Blue Slim Jeans",
        description: "Timeless blue jeans with a comfortable slim fit.",
        price: 2999,
        category: "Jeans",
        parentCategory: "men",
        gender: "Men",
        brand: "Denim Co",
        sizes: ["30", "32", "34", "36"],
        color: "Blue",
        fabric: "Denim",
        fit: "Slim Fit",
        occasion: "Casual",
        stock: 60,
        rating: 4.5,
        numReviews: 210,
        images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: true
    },
    {
        name: "Ripped Stone Wash Jeans",
        description: "Edgy ripped jeans with a light stone wash finish.",
        price: 3299,
        category: "Jeans",
        parentCategory: "men",
        gender: "Men",
        brand: "Street Icons",
        sizes: ["30", "32", "34"],
        color: "Blue",
        fabric: "Denim",
        fit: "Regular Fit",
        occasion: "Streetwear",
        stock: 45,
        rating: 4.3,
        numReviews: 95,
        images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },
    {
        name: "Black Tapered Denim",
        description: "Versatile black jeans with a modern tapered leg.",
        price: 2799,
        category: "Jeans",
        parentCategory: "men",
        gender: "Men",
        brand: "Denim Co",
        sizes: ["30", "32", "34", "36", "38"],
        color: "Black",
        fabric: "Denim",
        fit: "Slim Fit",
        occasion: "Casual",
        stock: 55,
        rating: 4.6,
        numReviews: 180,
        images: ["https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: false
    },

    // TROUSERS
    {
        name: "Grey Slim Fit Chinos",
        description: "Smart casual chinos suitable for work and weekends.",
        price: 2299,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "Aurea Basics",
        sizes: ["30", "32", "34", "36"],
        color: "Grey",
        fabric: "Cotton",
        fit: "Slim Fit",
        occasion: "Formal",
        stock: 40,
        rating: 4.4,
        numReviews: 75,
        images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },
    {
        name: "Olive Cargo Pants",
        description: "Functional cargo pants with multiple pockets.",
        price: 2599,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "Utility Gear",
        sizes: ["30", "32", "34"],
        color: "Green",
        fabric: "Cotton",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 30,
        rating: 4.7,
        numReviews: 110,
        images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },
    {
        name: "Navy Formal Trousers",
        description: "Sharp navy trousers for complete formal attire.",
        price: 2899,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "Aurea Formal",
        sizes: ["32", "34", "36", "38"],
        color: "Navy",
        fabric: "Blended",
        fit: "Slim Fit",
        occasion: "Formal",
        stock: 35,
        rating: 4.5,
        numReviews: 65,
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: false
    },

    // JACKETS
    {
        name: "Black Leather Biker Jacket",
        description: "Iconic faux leather biker jacket.",
        price: 5999,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "Roadster",
        sizes: ["M", "L", "XL"],
        color: "Black",
        fabric: "Synthetic",
        fit: "Regular Fit",
        occasion: "Streetwear",
        stock: 15,
        rating: 4.9,
        numReviews: 200,
        images: ["https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: true
    },
    {
        name: "Denim Trucker Jacket",
        description: "Classic blue denim jacket, a wardrobe staple.",
        price: 3499,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "Denim Co",
        sizes: ["S", "M", "L", "XL"],
        color: "Blue",
        fabric: "Denim",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 25,
        rating: 4.6,
        numReviews: 130,
        images: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },
    {
        name: "Beige Bomber Jacket",
        description: "Stylish beige bomber jacket for transitional weather.",
        price: 3999,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "Urban Edge",
        sizes: ["M", "L", "XL"],
        color: "Beige",
        fabric: "Polyester",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 20,
        rating: 4.5,
        numReviews: 90,
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },

    // HOODIES & SWEATSHIRTS
    {
        name: "Grey Oversized Hoodie",
        description: "Super soft fleece lined oversized hoodie.",
        price: 2499,
        category: "Hoodies",
        parentCategory: "men",
        gender: "Men",
        brand: "Cozy Life",
        sizes: ["M", "L", "XL", "XXL"],
        color: "Grey",
        fabric: "Cotton",
        fit: "Oversized",
        occasion: "Casual",
        stock: 40,
        rating: 4.8,
        numReviews: 250,
        images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: true
    },
    {
        name: "Black Graphic Sweatshirt",
        description: "Crew neck sweatshirt with minimal chest print.",
        price: 1999,
        category: "Sweaters",
        parentCategory: "men",
        gender: "Men",
        brand: "Street Icons",
        sizes: ["S", "M", "L", "XL"],
        color: "Black",
        fabric: "Cotton",
        fit: "Regular Fit",
        occasion: "Streetwear",
        stock: 35,
        rating: 4.3,
        numReviews: 80,
        images: ["https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },
    {
        name: "Navy Zip-Up Hoodie",
        description: "Practical zip-up hoodie for gym or casual outings.",
        price: 2299,
        category: "Hoodies",
        parentCategory: "men",
        gender: "Men",
        brand: "Active Life",
        sizes: ["S", "M", "L", "XL"],
        color: "Navy",
        fabric: "Blended",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 30,
        rating: 4.5,
        numReviews: 110,
        images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },

    // SWEATERS
    {
        name: "Cable Knit Cream Sweater",
        description: "Classic cable knit design for a sophisticated winter look.",
        price: 3499,
        category: "Sweaters",
        parentCategory: "men",
        gender: "Men",
        brand: "Aurea Winter",
        sizes: ["M", "L", "XL"],
        color: "White",
        fabric: "Wool",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 20,
        rating: 4.7,
        numReviews: 60,
        images: ["https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: false
    },
    {
        name: "Turtle Neck Black Sweater",
        description: "Sleek black turtle neck, perfect for layering.",
        price: 2999,
        category: "Sweaters",
        parentCategory: "men",
        gender: "Men",
        brand: "Modern Man",
        sizes: ["S", "M", "L", "XL"],
        color: "Black",
        fabric: "Blended",
        fit: "Slim Fit",
        occasion: "Formal",
        stock: 25,
        rating: 4.6,
        numReviews: 95,
        images: ["https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: true
    },

    // CO-ORDS
    {
        name: "Summer Breeze Linen Set",
        description: "Matching shirt and shorts set in breathable linen.",
        price: 4999,
        category: "Co-ords",
        parentCategory: "men",
        gender: "Men",
        brand: "Coastal Vibe",
        sizes: ["M", "L", "XL"],
        color: "Green",
        fabric: "Linen",
        fit: "Relaxed",
        occasion: "Casual",
        stock: 15,
        rating: 4.8,
        numReviews: 40,
        images: ["https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1587&auto=format&fit=crop"], // approximate visual
        isNewArrival: true
    },
    {
        name: "Streetwear Tracksuit Set",
        description: "Full tracksuit with side stripes for ultimate comfort.",
        price: 5499,
        category: "Co-ords",
        parentCategory: "men",
        gender: "Men",
        brand: "Active Life",
        sizes: ["M", "L", "XL"],
        color: "Black",
        fabric: "Polyester",
        fit: "Regular Fit",
        occasion: "Sports",
        stock: 20,
        rating: 4.5,
        numReviews: 70,
        images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: false
    },
    // Extra Items to reach 25
    {
        name: "Printed Resort Shirt",
        description: "Vibrant tropical print shirt for vacation vibes.",
        price: 1799,
        category: "Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "Coastal Vibe",
        sizes: ["M", "L", "XL"],
        color: "Multi",
        fabric: "Viscose",
        fit: "Relaxed",
        occasion: "Casual",
        stock: 30,
        rating: 4.3,
        numReviews: 50,
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800"],
        isNewArrival: false
    },
    {
        name: "Brown Corduroy Jacket",
        description: "Vintage inspired corduroy jacket.",
        price: 4499,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "Woodsmen",
        sizes: ["M", "L", "XL"],
        color: "Brown",
        fabric: "Cotton",
        fit: "Regular Fit",
        occasion: "Casual",
        stock: 18,
        rating: 4.7,
        numReviews: 85,
        images: ["https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=800"],
        isBestSeller: true
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

        // Clear existing men's products to avoid duplicates if re-running
        // await Product.deleteMany({ parentCategory: 'men' });
        // console.log('Existing Men products removed');

        // Note: In a real scenario we might check for duplicates by name instead of wiping.
        // For this task, let's just insert. If you run it twice you get duplicates.
        // Let's be smarter: check if product exists by name.

        let addedCount = 0;
        for (const product of menProducts) {
            const result = await Product.findOneAndUpdate(
                { name: product.name },
                product,
                { new: true, upsert: true }
            );
            // Count checking is less precise now but ensures data is fresh
            addedCount++;
        }

        console.log(`Imported ${addedCount} new Men's products!`);
        process.exit();
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
};

seedProducts();
