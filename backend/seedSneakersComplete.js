const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const sneakers = [
    // --- Casual Sneakers ---
    { name: "Urban Daily Kicks", subCategory: "Casual Sneakers", price: 2999 },
    { name: "Weekend Vibes Low", subCategory: "Casual Sneakers", price: 2499 },
    { name: "Canvas Slip-Ons", subCategory: "Casual Sneakers", price: 1999 },
    { name: "Retro Court Classic", subCategory: "Casual Sneakers", price: 3499 },
    { name: "Minimalist Suede", subCategory: "Casual Sneakers", price: 3999 },

    // --- Streetwear ---
    { name: "Hype Beast V1", subCategory: "Streetwear", price: 8999 },
    { name: "Graffiti High", subCategory: "Streetwear", price: 7499 },
    { name: "Urban Legend X", subCategory: "Streetwear", price: 9999 },
    { name: "Neon District", subCategory: "Streetwear", price: 8499 },
    { name: "Concrete Jungle Runner", subCategory: "Streetwear", price: 7999 },

    // --- Running ---
    { name: "Velocity Pro", subCategory: "Running", price: 4999 },
    { name: "Marathon Elite", subCategory: "Running", price: 6999 },
    { name: "Cloud Stride", subCategory: "Running", price: 5499 },
    { name: "Sprint Racer", subCategory: "Running", price: 4499 },
    { name: "Trail Blazer GT", subCategory: "Running", price: 5999 },

    // --- Training ---
    { name: "Gym Core Trainer", subCategory: "Training", price: 3999 },
    { name: "CrossFit Alpha", subCategory: "Training", price: 4599 },
    { name: "Lift Heavy Pro", subCategory: "Training", price: 4299 },
    { name: "Agility Flex", subCategory: "Training", price: 3799 },
    { name: "Endurance X", subCategory: "Training", price: 4199 },

    // --- High-Tops ---
    { name: "Court King High", subCategory: "High-Tops", price: 5999 },
    { name: "Retro Basketball 90s", subCategory: "High-Tops", price: 6499 },
    { name: "Canvas High Top", subCategory: "High-Tops", price: 2999 },
    { name: "Leather Street High", subCategory: "High-Tops", price: 6999 },
    { name: "Skate Pro High", subCategory: "High-Tops", price: 4999 },

    // --- Low-Tops ---
    { name: "Classic Low White", subCategory: "Low-Tops", price: 3499 },
    { name: "Skate Low Suede", subCategory: "Low-Tops", price: 3999 },
    { name: "Vintage Tennis Low", subCategory: "Low-Tops", price: 4499 },
    { name: "Premium Leather Low", subCategory: "Low-Tops", price: 5499, image: "/images/premium_leather_low.png" },
    { name: "Daily Driver Low", subCategory: "Low-Tops", price: 2999 },

    // --- Chunky ---
    { name: "Daddy Cool Chunky", subCategory: "Chunky", price: 5999 },
    { name: "Retro Wave Chunky", subCategory: "Chunky", price: 6499 },
    { name: "Platform Stomp", subCategory: "Chunky", price: 5499 },
    { name: "Bold Statement", subCategory: "Chunky", price: 6999 },
    { name: "Future Bulk", subCategory: "Chunky", price: 7499 },

    // --- Sustainable ---
    { name: "Eco Runner", subCategory: "Sustainable", price: 6999 },
    { name: "Recycled Ocean Plastic", subCategory: "Sustainable", price: 7999 },
    { name: "Vegan Leather Classic", subCategory: "Sustainable", price: 5999 },
    { name: "Organic Cotton Canvas", subCategory: "Sustainable", price: 4999 },
    { name: "Green Step", subCategory: "Sustainable", price: 6499 },

    // --- Limited Edition ---
    { name: "Golden Era LE", subCategory: "Limited Edition", price: 14999 },
    { name: "Artist Collab X", subCategory: "Limited Edition", price: 19999 },
    { name: "Midnight Run Special", subCategory: "Limited Edition", price: 12999 },
    { name: "Prototype Zero", subCategory: "Limited Edition", price: 15999 },
    { name: "Collector's Choice", subCategory: "Limited Edition", price: 24999 }
];

const categoryImages = {
    "Casual Sneakers": [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=800&auto=format&fit=crop"
    ],
    "Streetwear": [
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514989940723-e8875ea6ab7d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop"
    ],
    "Running": [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581636625402-29b2a7a99d63?q=80&w=800&auto=format&fit=crop"
    ],
    "Training": [
        "https://images.unsplash.com/photo-1518002171953-a080ee32bed2?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620138546344-7b2c38516daf?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop"
    ],
    "High-Tops": [
        "https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584735175097-719d848f8449?q=80&w=800&auto=format&fit=crop"
    ],
    "Low-Tops": [
        "https://images.unsplash.com/photo-1534653299134-96a171b61581?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1527090526205-beaac8dc3c62?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583577317377-3b2d6771d2b8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526639599548-dc8ae300f898?q=80&w=800&auto=format&fit=crop"
    ],
    "Chunky": [
        "https://images.unsplash.com/photo-1590483005391-768800b3e518?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550953256-42ec93f6c8d2?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1455243152648-52fd380b2a76?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1593453918093-8f3eead7b942?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1597248881519-db089d3744a5?q=80&w=800&auto=format&fit=crop"
    ],
    "Sustainable": [
        "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565259966396-820d82d4992b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523309996740-4053e1f0e8f7?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560072810-1cffb39bd990?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?q=80&w=800&auto=format&fit=crop"
    ],
    "Limited Edition": [
        "https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582890535914-87df440875e5?q=80&w=800&auto=format&fit=crop"
    ]
};

const seedSneakers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Track used images index per category
        const categoryCounts = {};

        for (const item of sneakers) {
            // Initialize count if not exists
            if (!categoryCounts[item.subCategory]) {
                categoryCounts[item.subCategory] = 0;
            }

            // Get specific image list for this category
            const imageList = categoryImages[item.subCategory] || [];

            // Get image based on current count (cyclical if more than images) or use specific image
            const imageUrl = item.image || (imageList.length > 0
                ? imageList[categoryCounts[item.subCategory] % imageList.length]
                : "https://via.placeholder.com/800"); // Fallback

            const product = {
                name: item.name,
                description: `High quality ${item.subCategory.toLowerCase()} designed for style and comfort.`,
                price: item.price,
                category: "Sneakers",
                subCategory: item.subCategory, // Critical for filtering
                parentCategory: "unisex", // Default parent
                gender: "Unisex",
                brand: "AUREA KICKS",
                color: ["Black", "White", "Red", "Blue"][categoryCounts[item.subCategory] % 4],
                sizes: ["7", "8", "9", "10", "11"],
                images: [imageUrl],
                fabric: "Synthetic",
                occasion: "Casual",
                fit: "Regular",
                rating: 4.5 + (Math.random() * 0.5),
                numReviews: Math.floor(Math.random() * 100),
                countInStock: 50
            };

            await Product.findOneAndUpdate(
                { name: item.name },
                product,
                { upsert: true, new: true }
            );
            console.log(`Seeded: ${item.name} (${item.subCategory})`);

            // Increment count for this category
            categoryCounts[item.subCategory]++;
        }

        console.log('All 45 Sneakers Seeded Successfully with Unique Images');
        process.exit();
    } catch (error) {
        console.error('Error seeding sneakers:', error);
        process.exit(1);
    }
};

seedSneakers();
