const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    {
        name: "Oversized Graphic T-Shirt",
        description: "Bold graphic tee with an oversized fit. A staple for any streetwear wardrobe.",
        price: 999,
        category: "T-Shirts", // Mapping
        parentCategory: "men", // Unisex vibe
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        fit: "Oversized",
        rating: 4.8,
        numReviews: 120,
        countInStock: 80
    },
    {
        name: "Solid Oversized Street T-Shirt",
        description: "Minimalist solid tee with a boxy, oversized cut. Premium heavy cotton.",
        price: 899,
        category: "T-Shirts",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Beige",
        images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Heavy Cotton",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        fit: "Oversized",
        rating: 4.7,
        numReviews: 95,
        countInStock: 70
    },
    {
        name: "Drop-Shoulder Hoodie",
        description: "Relaxed drop-shoulder hoodie for ultimate comfort and style.",
        price: 1999,
        category: "Hoodies",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton Fleece",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        fit: "Relaxed",
        rating: 4.9,
        numReviews: 150,
        countInStock: 60
    },
    {
        name: "Zip-Up Utility Hoodie",
        description: "Functional zip-up hoodie with extra pockets and durable construction.",
        price: 2299,
        category: "Hoodies",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSxpJttX5OeLkaxFlZZrBS-u505UBsthJR83pnzM7zCMjZ4Llshlp-7fCf1LHnxj4rcyUBc9TrpoRW8qYlc9NVf33UpIDjrjnwcTZAOjDWIPrOdHF9vo9ZnZCzaKLdPoH2A8qLM7w&usqp=CAc"],
        fabric: "Cotton Polymer",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.6,
        numReviews: 55,
        countInStock: 40
    },
    {
        name: "Cargo Pants with Multiple Pockets",
        description: "Rugged cargo pants featuring multiple utility pockets for functionality.",
        price: 2499,
        category: "Trousers", // Closest map
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Olive",
        images: ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbryG4Wn5D29qqrPe-64piOlt_1MfMZaZyhkqe4pPjUuA8d0PIcyLF_R7u7jsRydw-MyinTmfeMExAqmQm946-80c7NbqvIqCO6kLvWANyTudImUwhsiliGQ&usqp=CAc"],
        fabric: "Cotton Twill",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.8,
        numReviews: 110,
        countInStock: 50
    },
    {
        name: "Utility Joggers with Zip Pockets",
        description: "Sleek joggers with secure zip pockets. Perfect for the urban explorer.",
        price: 1899,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop"],
        fabric: "Nylon Blend",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.7,
        numReviews: 85,
        countInStock: 60
    },
    {
        name: "Relaxed-Fit Street Jeans",
        description: "Loose fit denim for that authentic 90s street look.",
        price: 2199,
        category: "Jeans",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Light Wash",
        images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"],
        fabric: "Denim",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        fit: "Relaxed",
        rating: 4.6,
        numReviews: 70,
        countInStock: 55
    },
    {
        name: "Distressed Denim Jeans",
        description: "Edgy distressed jeans with rips and tears. High impact style.",
        price: 2399,
        category: "Jeans",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Blue",
        images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Denim",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.5,
        numReviews: 60,
        countInStock: 45
    },
    {
        name: "Tactical Utility Jacket",
        description: "Heavy-duty jacket inspired by tactical gear. Lots of pockets and straps.",
        price: 3499,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"],
        fabric: "Polyester",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.9,
        numReviews: 45,
        countInStock: 30
    },
    {
        name: "Lightweight Windbreaker Jacket",
        description: "Packable windbreaker for unpredictable weather. Sporty and stylish.",
        price: 2199,
        category: "Jackets",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Colourblock",
        images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Nylon",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.7,
        numReviews: 65,
        countInStock: 50
    },
    {
        name: "Utility Shirt Jacket (Shacket)",
        description: "Hybrid shirt-jacket with utility pockets. Great for layering.",
        price: 2599,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Khaki",
        images: ["https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Cotton Canvas",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.6,
        numReviews: 40,
        countInStock: 40
    },
    {
        name: "Longline Street T-Shirt",
        description: "Extended length t-shirt with a curved hem. Ideal for layering under hoodies.",
        price: 1099,
        category: "T-Shirts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "White",
        images: ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.5,
        numReviews: 50,
        countInStock: 60
    },
    {
        name: "Co-Ord Set (Street Fit)",
        description: "Matching hoodie and joggers set for a complete street look.",
        price: 3999,
        category: "Co-ords",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRhg_Bcd6mIsGzv-fI0W8z2HRVYrLA_oOW-WjI4Bm3CCyPj0uIOKtRWOuv328lzqKImfg4jeSqWelKBuHO7EBBJ7NzQpIZ6jdJ4vhKK8VOa&usqp=CAc"], // Placeholder
        fabric: "Fleece",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.8,
        numReviews: 35,
        countInStock: 25
    },
    {
        name: "Utility Shorts with Side Pockets",
        description: "Summer essential. Cargo shorts with ample storage.",
        price: 1599,
        category: "Trousers", // Loose map, maybe add Shorts later
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Camo",
        images: ["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTZ-qUIX2rQCHg5EplnAGvJV9E1kugGd8y3Sahw2jjA3DNRO3D5HCvu47OQ00QoHIAdIDfAeBMBlk48EaVrVfwk0DSf6KTuYVcrsUJLPjq3vSprxCubXIka9rDfn7xwMw672v9Fbv7T&usqp=CAc"],
        fabric: "Cotton Blend",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.7,
        numReviews: 55,
        countInStock: 45
    },
    {
        name: "Track Pants with Stripe Detail",
        description: "Retro-inspired track pants with side stripes. Sporty street style.",
        price: 1799,
        category: "Trousers",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Navy",
        images: ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQh1T9brtrgJORJbU62mcP6Q7IqrW8c4wk5JFRiVzJfQdQAyo2UNXGngmJQUjCxUKeP6NvT5W28rMh4pJQnvn1PePvxv4lq_oo49LXwUX-jG3MaDLipo9RPoBMeSdcTbYh8OR7-xNg&usqp=CAc"],
        fabric: "Polyester",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.6,
        numReviews: 60,
        countInStock: 50
    },
    {
        name: "Sleeveless Utility Vest",
        description: "Technical vest with multiple pockets. A statement layering piece.",
        price: 2499,
        category: "Jackets", // Loose map
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1559582798-678dfc71ccd8?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Nylon",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.5,
        numReviews: 20,
        countInStock: 30
    },
    {
        name: "Streetwear Sweatshirt",
        description: "Classic crewneck sweatshirt with street-inspired graphics.",
        price: 1699,
        category: "Sweaters",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Red",
        images: ["https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Cotton Blend",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.7,
        numReviews: 45,
        countInStock: 40
    },
    {
        name: "Hooded Pullover Jacket",
        description: "Anorak style pullover jacket. Water-resistant and stylish.",
        price: 2699,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Yellow",
        images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Synthetic",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.6,
        numReviews: 25,
        countInStock: 35
    },
    {
        name: "Crossbody Utility Sling Bag",
        description: "Compact bag for essentials. Worn across the chest for a modern look.",
        price: 1299,
        category: "Bags",
        parentCategory: "unisex", // Changed to unisex
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop"],
        fabric: "Nylon",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.8,
        numReviews: 75,
        countInStock: 100
    },
    {
        name: "Street Cap / Utility Bucket Hat",
        description: "Versatile headwear to top off your street fit.",
        price: 799,
        category: "Hats",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1533827432537-70133748f5c8?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Streetwear",
        collectionName: "Street & Utility",
        rating: 4.7,
        numReviews: 80,
        countInStock: 90
    }
];

const seedStreetUtility = async () => {
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

        console.log('Street & Utility Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding Street & Utility:', error);
        process.exit(1);
    }
};

seedStreetUtility();
