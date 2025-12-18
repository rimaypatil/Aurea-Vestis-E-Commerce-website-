const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    {
        name: "Soft Cotton Oversized T-Shirt",
        description: "Experience cloud-like comfort with this ultra-soft oversized cotton t-shirt.",
        price: 899,
        category: "T-Shirts",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Sage Green",
        images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop"],
        fabric: "Premium Cotton",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        fit: "Oversized",
        rating: 4.9,
        numReviews: 85,
        countInStock: 80
    },
    {
        name: "Relaxed-Fit Lounge T-Shirt",
        description: "A breathable, relaxed fit t-shirt designed for all-day lounging.",
        price: 799,
        category: "T-Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Navy",
        images: ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton Blend",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        fit: "Relaxed",
        rating: 4.8,
        numReviews: 60,
        countInStock: 75
    },
    {
        name: "Cotton Co-Ord Comfort Set",
        description: "Matching top and bottom set. Effortless style meets maximum comfort.",
        price: 1999,
        category: "Co-Ords",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Beige",
        images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.7,
        numReviews: 90,
        countInStock: 50
    },
    {
        name: "Fleece Lounge Sweatshirt",
        description: "Soft fleece sweatshirt to keep you cozy during your downtime.",
        price: 1499,
        category: "Sweaters",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop"],
        fabric: "Fleece",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.8,
        numReviews: 70,
        countInStock: 60
    },
    {
        name: "Pullover Comfort Hoodie",
        description: "Classic pullover hoodie made from soft, durable fabric.",
        price: 1699,
        category: "Hoodies",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton Blend",
        occasion: "Casual",
        collectionName: "Comfort Outfit",
        rating: 4.6,
        numReviews: 120,
        countInStock: 65
    },
    {
        name: "Elastic Waist Cotton Joggers",
        description: "Joggers with a flexible elastic waist for unrestricted movement.",
        price: 1199,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Charcoal",
        images: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.7,
        numReviews: 100,
        countInStock: 80
    },
    {
        name: "Relaxed-Fit Lounge Pants",
        description: "Loose-fitting lounge pants. The ultimate work-from-home essential.",
        price: 999,
        category: "Trousers",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Pink",
        images: ["https://images.unsplash.com/photo-1506619216599-9d16d09030d0?q=80&w=800&auto=format&fit=crop"],
        fabric: "Viscose",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.8,
        numReviews: 85,
        countInStock: 70
    },
    {
        name: "Soft Knit Pajama Bottoms",
        description: "Knitted pajama bottoms that feel like a gentle hug.",
        price: 899,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Checkered",
        images: ["https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton Knit",
        occasion: "Nightwear",
        collectionName: "Comfort Outfit",
        rating: 4.9,
        numReviews: 50,
        countInStock: 60
    },
    {
        name: "Full-Sleeve Cotton Sleep Tee",
        description: "Long sleeve tee for a comfortable night's sleep.",
        price: 799,
        category: "T-Shirts", // Mapping Sleep Tee to T-Shirts
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "White",
        images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Nightwear",
        collectionName: "Comfort Outfit",
        rating: 4.6,
        numReviews: 40,
        countInStock: 55
    },
    {
        name: "Breathable Cotton Nightwear Set",
        description: "Full matching nightwear set. Breathable fabric prevents overheating.",
        price: 1599,
        category: "Co-Ords",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Blue",
        images: ["https://images.unsplash.com/photo-1594938374189-d6540c7657b5?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Nightwear",
        collectionName: "Comfort Outfit",
        rating: 4.8,
        numReviews: 35,
        countInStock: 45
    },
    {
        name: "Stretchable Lounge Shorts",
        description: "Super stretch shorts perfect for summer lounging.",
        price: 699,
        category: "Trousers", // Using Trousers as loose mapping for Shorts
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1591195853247-f52988226b9a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton Spandex",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.7,
        numReviews: 95,
        countInStock: 90
    },
    {
        name: "Ribbed Cotton Tank Top",
        description: "Basic ribbed tank. Great as an undershirt or for hot days.",
        price: 499,
        category: "Tops",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "White",
        images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"],
        fabric: "Ribbed Cotton",
        occasion: "Casual",
        collectionName: "Comfort Outfit",
        rating: 4.5,
        numReviews: 110,
        countInStock: 100
    },
    {
        name: "Lightweight Cardigan (Home Wear)",
        description: "Easy-to-wear cardigan. Adds a layer of warmth without the weight.",
        price: 1299,
        category: "Sweaters",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Beige",
        images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop"],
        fabric: "Light Knit",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.7,
        numReviews: 60,
        countInStock: 40
    },
    {
        name: "Soft Knit Sweatpants",
        description: "Premium knit sweatpants. A luxurious take on comfort wear.",
        price: 1699,
        category: "Trousers",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Cream",
        images: ["https://images.unsplash.com/photo-1506619216599-9d16d09030d0?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Knit Blend",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.8,
        numReviews: 45,
        countInStock: 35
    },
    {
        name: "Thermal Comfort Base Layer (Light)",
        description: "Lightweight thermal top. Ideal for mild winters or AC rooms.",
        price: 899,
        category: "Tops",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop"],
        fabric: "Thermal",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.6,
        numReviews: 75,
        countInStock: 85
    },
    {
        name: "Zip-Up Lounge Hoodie",
        description: "Convenient zip-up hoodie. Throw it on for instant comfort.",
        price: 1799,
        category: "Hoodies",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Navy",
        images: ["https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.7,
        numReviews: 55,
        countInStock: 50
    },
    {
        name: "Homewear Kurti / Long Comfort Tee",
        description: "Fusion wear comfort. Can be worn as a long tee or kurti.",
        price: 999,
        category: "Ethnic Wear",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Yellow",
        images: ["https://images.unsplash.com/photo-1583391726488-8d48475878af?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.5,
        numReviews: 30,
        countInStock: 40
    },
    {
        name: "Relaxed-Fit Track Pants",
        description: "Sporty yet relaxed. Track pants that don't compromise on comfort.",
        price: 1399,
        category: "Activewear",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800&auto=format&fit=crop"],
        fabric: "Polyester",
        occasion: "Activewear",
        collectionName: "Comfort Outfit",
        rating: 4.6,
        numReviews: 65,
        countInStock: 60
    },
    {
        name: "Soft Fleece Robe / House Jacket",
        description: "Plush robe for maximum coziness. Like wearing a blanket.",
        price: 2499,
        category: "Jackets", // Mapping Robe to Jackets for now
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "White",
        images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Fleece",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.9,
        numReviews: 40,
        countInStock: 30
    },
    {
        name: "Slipper-Style Indoor Footwear",
        description: "Soft indoor slippers to keep your feet happy.",
        price: 599,
        category: "Footwear",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=800&auto=format&fit=crop"], // Placeholder for shoes
        fabric: "Plush",
        occasion: "Loungewear",
        collectionName: "Comfort Outfit",
        rating: 4.7,
        numReviews: 100,
        countInStock: 120
    }
];

const seedComfortOutfit = async () => {
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

        console.log('Comfort Outfit Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding Comfort Outfit:', error);
        process.exit(1);
    }
};

seedComfortOutfit();
