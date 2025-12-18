const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    {
        name: "Solid Cotton Round-Neck T-Shirt",
        description: "Classic round-neck t-shirt made from breathable cotton. A staple for any wardrobe.",
        price: 799,
        category: "T-Shirts", // Mapping to closest existing category
        parentCategory: "men", // Assuming Men/Unisex default, will vary based on item
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "White",
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.5,
        numReviews: 45,
        stock: 50
    },
    {
        name: "Basic Crew Neck T-Shirt (Pack of 2)",
        description: "Value pack of two essential crew neck tees. Soft, durable, and comfortable.",
        price: 1499,
        category: "T-Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.6,
        numReviews: 60,
        stock: 40
    },
    {
        name: "Polo T-Shirt (Regular Fit)",
        description: "Smart casual polo t-shirt with a comfortable regular fit. Perfect for office Fridays.",
        price: 1299,
        category: "T-Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Navy",
        images: ["https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton Blend",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.7,
        numReviews: 35,
        stock: 30
    },
    {
        name: "Casual Cotton Shirt (Solid)",
        description: "Versatile solid color shirt. Can be dressed up or down for any occasion.",
        price: 1599,
        category: "Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Blue",
        images: ["https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ5iCRLEVa4LupXD3mIYwmiu-YDVATMrYvn3gIppxf0IINj0AN-3dxN9eJFNOSi_RtlBCEDC9HCvKHucARzyzGXvHT9s4fSSx_FT0IynFEX--jCD775ESnRS2S15o7NjMP1oQYnOLY&usqp=CAc"],
        fabric: "Cotton",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.4,
        numReviews: 28,
        stock: 35
    },
    {
        name: "Printed Casual Top",
        description: "Trendy printed top for effortless style. Lightweight and comfortable for all-day wear.",
        price: 999,
        category: "Tops",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Multi",
        images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"],
        fabric: "Viscose",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.6,
        numReviews: 42,
        stock: 25
    },
    {
        name: "Plain Daily-Wear Kurti",
        description: "Simple and elegant solid color kurti. Ideal for daily wear and work.",
        price: 1199,
        category: "Ethnic Wear",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Yellow",
        images: ["https://ahika.in/cdn/shop/products/vck1552_2.jpg"], // Placeholder for Kurti/similar
        fabric: "Cotton",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.5,
        numReviews: 33,
        stock: 40
    },
    {
        name: "Slim-Fit Jeans",
        description: "Classic slim-fit jeans with just the right amount of stretch. A wardrobe essential.",
        price: 1999,
        category: "Jeans",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Blue",
        images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Denim",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.8,
        numReviews: 80,
        stock: 60
    },
    {
        name: "Straight-Fit Jeans",
        description: "Relaxed straight-fit jeans for maximum comfort. Timeless style.",
        price: 1999,
        category: "Jeans",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"],
        fabric: "Denim",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.6,
        numReviews: 55,
        stock: 50
    },
    {
        name: "Cotton Chinos",
        description: "Smart and comfortable chinos made from premium cotton. Great for semi-formal looks.",
        price: 1699,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Beige",
        images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Casual", // Changed from Smart Casual
        collectionName: "Everyday Essentials",
        rating: 4.7,
        numReviews: 40,
        stock: 45
    },
    {
        name: "Cotton Leggings",
        description: "Soft and stretchy cotton leggings. Perfect for layering or active wear.",
        price: 699,
        category: "Activewear",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTkt5LNXArnJROw-_ujif7JFbA7hHBcCiM_iIpsC82LeTxS3SqX7fFJgvG7eiEGUG5z-fN_9VDAcsLp-ccpGjij0lhrjUl4oIZupHeKUL-oTuQA6oHr-UhBife-Ie_LkTvsDg5iE2N5&usqp=CAc"],
        fabric: "Cotton Spandex",
        occasion: "Sports", // Changed from Activewear
        collectionName: "Everyday Essentials",
        rating: 4.5,
        numReviews: 70,
        stock: 80
    },
    {
        name: "Palazzo Pants",
        description: "Flowy and comfortable palazzo pants. Adds a touch of elegance to any top.",
        price: 1299,
        category: "Trousers",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop"],
        fabric: "Viscose",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.6,
        numReviews: 25,
        stock: 30
    },
    {
        name: "Casual Joggers",
        description: "Relaxed fit joggers for lounging or errands. Features a drawstring waist.",
        price: 1399,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton Blend",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.7,
        numReviews: 65,
        stock: 50
    },
    {
        name: "Cotton Lounge Pants",
        description: "Ultra-soft lounge pants designed for home comfort. Breathable and loose fitting.",
        price: 999,
        category: "Trousers",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Checkered",
        images: ["https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=800&auto=format&fit=crop"], // Changed Duplicate
        fabric: "Cotton",
        occasion: "Casual", // Changed from Loungewear
        collectionName: "Everyday Essentials",
        rating: 4.8,
        numReviews: 50,
        stock: 60
    },
    {
        name: "Everyday Track Pants",
        description: "Durable track pants for your daily workout or run. Moisture-wicking fabric.",
        price: 1199,
        category: "Activewear",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Navy",
        images: ["https://m.media-amazon.com/images/I/51GefVnhbvL._SY879_.jpg"],
        fabric: "Polyester",
        occasion: "Sports",
        collectionName: "Everyday Essentials",
        rating: 4.6,
        numReviews: 45,
        stock: 40
    },
    {
        name: "Lightweight Hoodie",
        description: "Perfect layer for breezy days. Soft hoodie with a convenient kangaroo pocket.",
        price: 1799,
        category: "Hoodies",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton Fleece",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.8,
        numReviews: 90,
        stock: 70
    },
    {
        name: "Casual Zip Jacket",
        description: "Stylish zip-up jacket to complete your look. Versatile and practical.",
        price: 2199,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"],
        fabric: "Polyester",
        occasion: "Casual",
        collectionName: "Everyday Essentials",
        rating: 4.5,
        numReviews: 30,
        stock: 25
    },
    {
        name: "Cotton Nightwear Pyjama",
        description: "Cozy cotton pyjamas for a good night's sleep. Soft on the skin.",
        price: 899,
        category: "Trousers", // Using Trousers as loose mapping for nightwear bottoms
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Blue",
        images: ["https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/FEBRUARY/18/K3jDNJPE_169940ffd26c46d4b175c9ea9166dca5.jpg"],
        fabric: "Cotton",
        occasion: "Casual", // Changed from Nightwear
        collectionName: "Everyday Essentials",
        rating: 4.7,
        numReviews: 38,
        stock: 55
    },
    {
        name: "Night Dress / Sleep Tee",
        description: "Comfortable oversized sleep tee. Relax and unwind in style.",
        price: 999,
        category: "Dresses", // Loose mapping
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Pink",
        images: ["https://i.pinimg.com/originals/5f/11/40/5f1140114c79d502d4f6060e685a2f7b.jpg"],
        fabric: "Cotton",
        occasion: "Casual", // Changed from Nightwear
        collectionName: "Everyday Essentials",
        rating: 4.6,
        numReviews: 40,
        stock: 45
    },
    {
        name: "Thermal Wear Top",
        description: "Insulating thermal top to keep you warm in winter. Fits snugly under clothes.",
        price: 699,
        category: "Tops",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1542327897-4141b355e20e?q=80&w=800&auto=format&fit=crop"], // Changed Low Res
        fabric: "Thermal",
        occasion: "Casual", // Changed from Winter
        collectionName: "Everyday Essentials",
        rating: 4.8,
        numReviews: 60,
        stock: 80
    },
    {
        name: "Thermal Wear Bottom",
        description: "Matching thermal bottoms for complete warmth. Essential for cold climates.",
        price: 699,
        category: "Trousers",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://www.jockey.in/cdn/shop/files/2421_BLACK_0105_S225_JKY_1.webp?v=1759808353&width=560"],
        fabric: "Thermal",
        occasion: "Casual", // Changed from Winter
        collectionName: "Everyday Essentials",
        rating: 4.8,
        numReviews: 55,
        stock: 75
    }
];

const seedEverydayEssentials = async () => {
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

        console.log('Everyday Essentials Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding Everyday Essentials:', error);
        process.exit(1);
    }
};

seedEverydayEssentials();
