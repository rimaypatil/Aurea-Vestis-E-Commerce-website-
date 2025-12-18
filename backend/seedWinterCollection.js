const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    {
        name: "Heavyweight Oversized Winter Hoodie",
        description: "Ultra-warm heavyweight hoodie perfect for freezing temperatures. Oversized fit.",
        price: 2499,
        category: "Hoodies",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop"],
        fabric: "Heavy Cotton Fleece",
        occasion: "Casual",
        collectionName: "Winter Collection",
        fit: "Oversized",
        rating: 4.8,
        numReviews: 100,
        countInStock: 80
    },
    {
        name: "Fleece-Lined Pullover Hoodie",
        description: "Soft fleece lining for extra warmth on chilly days.",
        price: 1999,
        category: "Hoodies",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop"],
        fabric: "Fleece",
        occasion: "Casual",
        collectionName: "Winter Collection",
        rating: 4.7,
        numReviews: 85,
        countInStock: 70
    },
    {
        name: "Quilted Puffer Jacket",
        description: "Classic puffer jacket to keep the cold out. Lightweight yet warm.",
        price: 3499,
        category: "Jackets",
        parentCategory: "men",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Navy",
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"],
        fabric: "Nylon",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.9,
        numReviews: 120,
        countInStock: 60
    },
    {
        name: "Lightweight Down Jacket",
        description: "Premium down filling for superior insulation without the bulk.",
        price: 4999,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Olive",
        images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop"],
        fabric: "Down",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 5.0,
        numReviews: 45,
        countInStock: 30
    },
    {
        name: "Utility Parka Jacket with Hood",
        description: "Heavy-duty parka with fur-lined hood. Built for extreme winter.",
        price: 5999,
        category: "Jackets", // Mapping Parka to Jacket
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop"],
        fabric: "Polyester",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.8,
        numReviews: 60,
        countInStock: 25
    },
    {
        name: "Wool-Blend Long Coat",
        description: "Sophisticated long coat made from a premium wool blend. Elegant and warm.",
        price: 4499,
        category: "Jackets", // Mapping Coat to Jacket
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Camel",
        images: ["https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=800&auto=format&fit=crop"],
        fabric: "Wool Blend",
        occasion: "Formal",
        collectionName: "Winter Collection",
        rating: 4.7,
        numReviews: 40,
        countInStock: 35
    },
    {
        name: "Thermal Inner Top",
        description: "Essential base layer. Keeps body heat locked in.",
        price: 799,
        category: "Tops",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "White",
        images: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop"],
        fabric: "Thermal",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.6,
        numReviews: 150,
        countInStock: 200
    },
    {
        name: "Thermal Inner Bottom",
        description: "Matching thermal pants for complete winter protection.",
        price: 799,
        category: "Trousers",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "White",
        images: ["https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Thermal",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.6,
        numReviews: 140,
        countInStock: 180
    },
    {
        name: "Cable Knit Sweater",
        description: "Classic cable knit pattern. Cozy, chunky, and stylish.",
        price: 2199,
        category: "Sweaters",
        parentCategory: "women",
        gender: "Women",
        brand: "AUREA VESTIS",
        color: "Cream",
        images: ["https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop"], // Placeholder for sweater
        fabric: "Wool Acrylic",
        occasion: "Casual",
        collectionName: "Winter Collection",
        rating: 4.8,
        numReviews: 90,
        countInStock: 50
    },
    {
        name: "Ribbed Wool Sweater",
        description: "Smart ribbed sweater. Fits well and keeps you warm.",
        price: 1899,
        category: "Sweaters",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Navy",
        images: ["https://images.unsplash.com/photo-1611312449408-fcece2752171?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Wool Blend",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.7,
        numReviews: 65,
        countInStock: 55
    },
    {
        name: "High-Neck Turtleneck Sweater",
        description: "Elegant turtleneck for a refined winter look.",
        price: 1999,
        category: "Sweaters",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Cotton Wool",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.6,
        numReviews: 50,
        countInStock: 45
    },
    {
        name: "Fleece Joggers",
        description: "Joggers lined with fleece for superior comfort and warmth.",
        price: 1599,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Grey",
        images: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop"],
        fabric: "Fleece",
        occasion: "Casual",
        collectionName: "Winter Collection",
        rating: 4.8,
        numReviews: 80,
        countInStock: 60
    },
    {
        name: "Thermal Track Pants",
        description: "Insulated track pants for outdoor activities in the cold.",
        price: 1699,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800&auto=format&fit=crop"],
        fabric: "Thermal",
        occasion: "Sports",
        collectionName: "Winter Collection",
        rating: 4.7,
        numReviews: 45,
        countInStock: 50
    },
    {
        name: "Winter Cargo Pants",
        description: "Thick cargo pants designed for winter durability.",
        price: 2199,
        category: "Trousers",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Green",
        images: ["https://images.unsplash.com/photo-1517445312882-b41ddc9e5046?q=80&w=800&auto=format&fit=crop"],
        fabric: "Heavy Cotton",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.6,
        numReviews: 55,
        countInStock: 40
    },
    {
        name: "Sherpa-Lined Denim Jacket",
        description: "Classic denim jacket with a warm sherpa lining and collar.",
        price: 3299,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Blue",
        images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Denim Sherpa",
        occasion: "Casual",
        collectionName: "Winter Collection",
        rating: 4.9,
        numReviews: 75,
        countInStock: 35
    },
    {
        name: "Windproof Utility Jacket",
        description: "Technical jacket designed to block out wind and cold.",
        price: 2899,
        category: "Jackets",
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Charcoal",
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"],
        fabric: "Polyester",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.7,
        numReviews: 40,
        countInStock: 30
    },
    {
        name: "Knitted Beanie Cap",
        description: "Essential winter accessory. Keep your head warm in style.",
        price: 599,
        category: "Hats",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800&auto=format&fit=crop"],
        fabric: "Acrylic",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.8,
        numReviews: 120,
        countInStock: 100
    },
    {
        name: "Winter Scarf (Wool Blend)",
        description: "Soft and long scarf to wrap up against the cold.",
        price: 899,
        category: "Accessories",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Checkered",
        images: ["https://m.media-amazon.com/images/I/71ghXVroPIL._AC_UF894,1000_QL80_.jpg"],
        fabric: "Wool Blend",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.6,
        numReviews: 60,
        countInStock: 80
    },
    {
        name: "Touchscreen Winter Gloves",
        description: "Warm gloves that let you use your phone without taking them off.",
        price: 699,
        category: "Accessories",
        parentCategory: "unisex",
        gender: "Unisex",
        brand: "AUREA VESTIS",
        color: "Black",
        images: ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSxpJttX5OeLkaxFlZZrBS-u505UBsthJR83pnzM7zCMjZ4Llshlp-7fCf1LHnxj4rcyUBc9TrpoRW8qYlc9NVf33UpIDjrjnwcTZAOjDWIPrOdHF9vo9ZnZCzaKLdPoH2A8qLM7w&usqp=CAc"],
        fabric: "Synthetic",
        occasion: "Winter",
        collectionName: "Winter Collection",
        rating: 4.7,
        numReviews: 90,
        countInStock: 90
    },
    {
        name: "Sleeveless Puffer Vest",
        description: "Versatile puffer vest for layering over hoodies or sweaters.",
        price: 2299,
        category: "Jackets", // Mapping Vest to Jacket
        parentCategory: "men",
        gender: "Men",
        brand: "AUREA VESTIS",
        color: "Navy",
        images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"], // Placeholder
        fabric: "Nylon",
        occasion: "Casual",
        collectionName: "Winter Collection",
        rating: 4.6,
        numReviews: 50,
        countInStock: 45
    }
];

const seedWinterCollection = async () => {
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

        console.log('Winter Collection Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding Winter Collection:', error);
        process.exit(1);
    }
};

seedWinterCollection();
