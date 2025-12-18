const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    // Bags
    {
        name: "Classic Leather Tote Bag",
        description: "A spacious and stylish leather tote bag, perfect for daily commuting and shopping. Features durable handles and a premium finish.",
        price: 4999,
        category: "Bags",
        parentCategory: "men", // Using men as default generic, or unisex if available, sticking to existing pattern
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Brown",
        images: ["https://images.unsplash.com/photo-1590874103328-eac65d684363?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Casual",
        rating: 4.5,
        numReviews: 10,
        countInStock: 20
    },
    {
        name: "Minimalist Crossbody Sling Bag",
        description: "Compact and trendy crossbody sling bag for essentials. Ideal for travel and casual outings.",
        price: 2499,
        category: "Bags",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"],
        fabric: "Synthetic",
        occasion: "Casual",
        rating: 4.6,
        numReviews: 15,
        countInStock: 25
    },
    {
        name: "Canvas Travel Duffel Bag",
        description: "Durable canvas duffel bag with ample storage for weekend getaways. Includes a detachable shoulder strap.",
        price: 3999,
        category: "Bags",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Green",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"],
        fabric: "Canvas",
        occasion: "Travel",
        rating: 4.7,
        numReviews: 8,
        countInStock: 15
    },
    {
        name: "Premium Office Laptop Bag",
        description: "Sleek and professional laptop bag with padded compartments. protects your device in style.",
        price: 5499,
        category: "Bags",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Navy",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"], // Placeholder, replace if better found
        fabric: "Polyester",
        occasion: "Formal",
        rating: 4.8,
        numReviews: 12,
        countInStock: 18
    },
    {
        name: "Urban Backpack with USB Port",
        description: "Modern backpack featuring a built-in USB charging port and anti-theft design. Perfect for students and professionals.",
        price: 3499,
        category: "Bags",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Nylon",
        occasion: "Daily",
        rating: 4.6,
        numReviews: 20,
        countInStock: 30
    },

    // Footwear
    {
        name: "White Casual Sneakers",
        description: "Versatile white sneakers that go with every outfit. Comfortable and stylish for all-day wear.",
        price: 2999,
        category: "Footwear",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "White",
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Casual",
        rating: 4.7,
        numReviews: 25,
        countInStock: 30
    },
    {
        name: "Formal Leather Oxford Shoes",
        description: "Classic black leather Oxford shoes for formal occasions. Elevate your suit with these timeless shoes.",
        price: 6999,
        category: "Footwear",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Formal",
        rating: 4.9,
        numReviews: 10,
        countInStock: 15
    },
    {
        name: "Lightweight Running Shoes",
        description: "Breathable and lightweight running shoes designed for performance. Features cushioned soles for impact protection.",
        price: 3499,
        category: "Footwear",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Blue",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"],
        fabric: "Mesh",
        occasion: "Sports",
        rating: 4.8,
        numReviews: 30,
        countInStock: 25
    },
    {
        name: "Classic Loafers",
        description: "Slip-on loafers offering both comfort and sophistication. Great for semi-formal and casual settings.",
        price: 4499,
        category: "Footwear",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Brown",
        images: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Suede",
        occasion: "Casual",
        rating: 4.6,
        numReviews: 18,
        countInStock: 20
    },
    {
        name: "High-Top Street Sneakers",
        description: "Edgy high-top sneakers for a bold street style look. Durable and fashionable.",
        price: 3999,
        category: "Footwear",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Red",
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Synthetic",
        occasion: "Streetwear",
        rating: 4.7,
        numReviews: 22,
        countInStock: 25
    },

    // Wallets
    {
        name: "Genuine Leather Bi-Fold Wallet",
        description: "Classic bi-fold wallet made from genuine leather. Features multiple card slots and a currency compartment.",
        price: 1499,
        category: "Wallets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Daily",
        rating: 4.8,
        numReviews: 35,
        countInStock: 50
    },
    {
        name: "Slim RFID-Protected Wallet",
        description: "Modern slim wallet with RFID blocking technology to keep your cards safe. Fits perfectly in any pocket.",
        price: 1999,
        category: "Wallets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Brown",
        images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Leather",
        occasion: "Daily",
        rating: 4.7,
        numReviews: 28,
        countInStock: 40
    },
    {
        name: "Minimal Card Holder Wallet",
        description: "Ultra-compact card holder for the minimalist. Holds essential cards and cash.",
        price: 999,
        category: "Wallets",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Tan",
        images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Leather",
        occasion: "Daily",
        rating: 4.6,
        numReviews: 40,
        countInStock: 60
    },
    {
        name: "Zippered Travel Wallet",
        description: "Secure zippered wallet designed for travel. Keeps your passport, cards, and currency organized.",
        price: 2499,
        category: "Wallets",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Nylon",
        occasion: "Travel",
        rating: 4.8,
        numReviews: 20,
        countInStock: 30
    },
    {
        name: "Vintage Brown Leather Wallet",
        description: "Rugged vintage-style leather wallet that ages beautifully. A timeless accessory.",
        price: 1799,
        category: "Wallets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Brown",
        images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Leather",
        occasion: "Casual",
        rating: 4.7,
        numReviews: 32,
        countInStock: 45
    },

    // Belts
    {
        name: "Formal Black Leather Belt",
        description: "Sleek black leather belt with a polished metal buckle. Essential for formal wear.",
        price: 1299,
        category: "Belts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop"],
        fabric: "Leather",
        occasion: "Formal",
        rating: 4.8,
        numReviews: 42,
        countInStock: 50
    },
    {
        name: "Brown Casual Leather Belt",
        description: "Sturdy brown leather belt for jeans and chinos. Adds a rugged touch to your outfit.",
        price: 1299,
        category: "Belts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Brown",
        images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Leather",
        occasion: "Casual",
        rating: 4.7,
        numReviews: 38,
        countInStock: 48
    },
    {
        name: "Reversible Dual-Tone Belt",
        description: "Versatile belt offering black and brown sides. Two styles in one for maximum utility.",
        price: 1599,
        category: "Belts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Multi",
        images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Leather",
        occasion: "Daily",
        rating: 4.9,
        numReviews: 25,
        countInStock: 40
    },
    {
        name: "Canvas Web Belt",
        description: "Casual canvas web belt with a sliding buckle. Comfortable and durable for everyday wear.",
        price: 899,
        category: "Belts",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Green",
        images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Canvas",
        occasion: "Casual",
        rating: 4.5,
        numReviews: 30,
        countInStock: 55
    },
    {
        name: "Automatic Buckle Belt",
        description: "Modern belt with an automatic ratchet buckle for a perfectly adjustable fit.",
        price: 1999,
        category: "Belts",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Leather",
        occasion: "Formal",
        rating: 4.8,
        numReviews: 20,
        countInStock: 35
    },

    // Perfume
    {
        name: "Fresh Citrus Eau de Parfum",
        description: "Invigorating citrus notes blended with fresh herbs. A refreshing scent for daytime wear.",
        price: 2999,
        category: "Perfume",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Clear",
        images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop"],
        fabric: "None",
        occasion: "Daily",
        rating: 4.7,
        numReviews: 18,
        countInStock: 40
    },
    {
        name: "Woody Musk Long-Lasting Perfume",
        description: "Deep woody notes with a hint of musk. sophisticated and long-lasting fragrance.",
        price: 3499,
        category: "Perfume",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Gold",
        images: ["https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=800&auto=format&fit=crop"],
        fabric: "None",
        occasion: "Evening",
        rating: 4.8,
        numReviews: 22,
        countInStock: 35
    },
    {
        name: "Spicy Oriental Perfume",
        description: "Exotic blend of spices and warm resins. A bold fragrance for special occasions.",
        price: 3999,
        category: "Perfume",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Red",
        images: ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop"],
        fabric: "None",
        occasion: "Party",
        rating: 4.9,
        numReviews: 15,
        countInStock: 25
    },
    {
        name: "Classic Floral Day Perfume",
        description: "Light and airy floral scent with notes of jasmine and rose. Perfect for spring and summer.",
        price: 2799,
        category: "Perfume",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Pink",
        images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop"],
        fabric: "None",
        occasion: "Daily",
        rating: 4.6,
        numReviews: 25,
        countInStock: 45
    },
    {
        name: "Premium Night Fragrance",
        description: "Intense and seductive fragrance designed for evening wear. Leave a lasting impression.",
        price: 4499,
        category: "Perfume",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Purple",
        images: ["https://images.unsplash.com/photo-1512777576244-b846ac3d816f?q=80&w=800&auto=format&fit=crop"],
        fabric: "None",
        occasion: "Evening",
        rating: 4.8,
        numReviews: 20,
        countInStock: 30
    },

    // Watches
    {
        name: "Classic Analog Leather Watch",
        description: "Timeless analog watch with a genuine leather strap. clean dial design for effortless reading.",
        price: 5999,
        category: "Watches",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop"],
        fabric: "Metal",
        occasion: "Formal",
        rating: 4.8,
        numReviews: 15,
        countInStock: 20
    },
    {
        name: "Stainless Steel Chronograph Watch",
        description: "Robust stainless steel watch with chronograph features. precise quartz movement.",
        price: 8999,
        category: "Watches",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Silver",
        images: ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop"],
        fabric: "Steel",
        occasion: "Formal",
        rating: 4.9,
        numReviews: 25,
        countInStock: 15
    },
    {
        name: "Minimalist Dial Watch",
        description: "Sleek modern watch with a minimalist dial and mesh strap. Understated elegance.",
        price: 4999,
        category: "Watches",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Gold",
        images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Metal",
        occasion: "Casual",
        rating: 4.7,
        numReviews: 30,
        countInStock: 25
    },
    {
        name: "Automatic Skeleton Watch",
        description: "Intricate automatic watch revealing the inner mechanism. A conversation starter for watch enthusiasts.",
        price: 12999,
        category: "Watches",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Steel",
        occasion: "Special",
        rating: 5.0,
        numReviews: 10,
        countInStock: 8
    },
    {
        name: "Casual Sports Watch",
        description: "Durable digital sports watch with water resistance and stopwatch functions. Ready for adventure.",
        price: 2999,
        category: "Watches",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Blue",
        images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Rubber",
        occasion: "Sports",
        rating: 4.6,
        numReviews: 40,
        countInStock: 50
    },

    // Jewellery
    {
        name: "Silver Chain Necklace",
        description: "Simple and elegant silver chain. Wear it alone or with a pendant.",
        price: 1999,
        category: "Jewellery",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Silver",
        images: ["https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop"],
        fabric: "Silver",
        occasion: "Daily",
        rating: 4.7,
        numReviews: 20,
        countInStock: 30
    },
    {
        name: "Minimal Stud Earrings",
        description: "Classic stud earrings for a touch of sparkle. Hypoallergenic and comfortable.",
        price: 899,
        category: "Jewellery",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Gold",
        images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"],
        fabric: "Gold Plated",
        occasion: "Daily",
        rating: 4.8,
        numReviews: 25,
        countInStock: 40
    },
    {
        name: "Elegant Pearl Bracelet",
        description: "Timeless pearl bracelet adding grace to any outfit. ideal for formal events.",
        price: 2499,
        category: "Jewellery",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Pearl",
        images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Pearl",
        occasion: "Formal",
        rating: 4.9,
        numReviews: 12,
        countInStock: 20
    },
    {
        name: "Gold-Plated Ring",
        description: "Chic gold-plated ring with a modern design. Stackable or stunning on its own.",
        price: 1299,
        category: "Jewellery",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Gold",
        images: ["https://images.unsplash.com/photo-1605100804763-ebea2409a8d9?q=80&w=800&auto=format&fit=crop"],
        fabric: "Gold Plated",
        occasion: "Casual",
        rating: 4.6,
        numReviews: 30,
        countInStock: 35
    },
    {
        name: "Classic Cufflinks",
        description: "Sophisticated cufflinks to polish off your formal suit. A gentleman's essential.",
        price: 1499,
        category: "Jewellery",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Silver",
        images: ["https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Metal",
        occasion: "Formal",
        rating: 4.8,
        numReviews: 15,
        countInStock: 25
    },

    // Sunglasses
    {
        name: "Black Wayfarer Sunglasses",
        description: "Iconic wayfarer sunglasses that suit every face shape. Full UV protection.",
        price: 1999,
        category: "Sunglasses",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop"],
        fabric: "Plastic",
        occasion: "Casual",
        rating: 4.8,
        numReviews: 45,
        countInStock: 60
    },
    {
        name: "Aviator Sunglasses",
        description: "Classic aviator sunglasses with metal frames. Cool, timeless style.",
        price: 2499,
        category: "Sunglasses",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Gold",
        images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"],
        fabric: "Metal",
        occasion: "Casual",
        rating: 4.7,
        numReviews: 38,
        countInStock: 50
    },
    {
        name: "Round Vintage Sunglasses",
        description: "Retro round sunglasses for a vintage-inspired look. distinctive and stylish.",
        price: 2199,
        category: "Sunglasses",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Tortoise",
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Acetate",
        occasion: "Casual",
        rating: 4.6,
        numReviews: 24,
        countInStock: 40
    },
    {
        name: "Polarized Sports Sunglasses",
        description: "Performance sports sunglasses with polarized lenses to reduce glare. Stays put during action.",
        price: 2999,
        category: "Sunglasses",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Blue",
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Plastic",
        occasion: "Sports",
        rating: 4.9,
        numReviews: 18,
        countInStock: 30
    },
    {
        name: "UV-Protected Square Frame Sunglasses",
        description: "Modern square frame sunglasses with 100% UV protection. Bold and contemporary.",
        price: 2299,
        category: "Sunglasses",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Acetate",
        occasion: "Casual",
        rating: 4.7,
        numReviews: 20,
        countInStock: 35
    },

    // Hats
    {
        name: "Classic Baseball Cap",
        description: "Essential baseball cap with adjustable strap. Perfect for casual days and sun protection.",
        price: 999,
        category: "Hats",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Blue",
        images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop"],
        fabric: "Cotton",
        occasion: "Casual",
        rating: 4.6,
        numReviews: 50,
        countInStock: 60
    },
    {
        name: "Woolen Beanie",
        description: "Warm and cozy woolen beanie for cold weather. Soft knit for maximum comfort.",
        price: 799,
        category: "Hats",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800&auto=format&fit=crop"],
        fabric: "Wool",
        occasion: "Winter",
        rating: 4.8,
        numReviews: 40,
        countInStock: 45
    },
    {
        name: "Wide-Brim Summer Hat",
        description: "Stylish wide-brim hat for beach days and summer outings. Excellent sun coverage.",
        price: 1499,
        category: "Hats",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Straw",
        images: ["https://images.unsplash.com/photo-1565609337563-71b569550b00?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Straw",
        occasion: "Summer",
        rating: 4.7,
        numReviews: 25,
        countInStock: 30
    },
    {
        name: "Adjustable Snapback Cap",
        description: "Trendy snapback cap with a flat brim. Customizable fit for a street-ready look.",
        price: 1199,
        category: "Hats",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Cotton",
        occasion: "Casual",
        rating: 4.8,
        numReviews: 35,
        countInStock: 40
    },
    {
        name: "Bucket Hat",
        description: "Retro 90s style bucket hat. Fun, reversible design for versatile styling.",
        price: 1099,
        category: "Hats",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "White",
        images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Canvas",
        occasion: "Casual",
        rating: 4.5,
        numReviews: 28,
        countInStock: 35
    }
];

const seedAccessories = async () => {
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

        console.log('All Accessories Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding accessories:', error);
        process.exit(1);
    }
};

seedAccessories();
