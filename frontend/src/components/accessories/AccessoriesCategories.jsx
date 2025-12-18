import { Link } from 'react-router-dom';

export default function AccessoriesCategories() {
    const categories = [
        { name: "Bags", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop" },
        { name: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop" },
        { name: "Wallets", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop" },
        { name: "Belts", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop" },
        { name: "Perfume", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop" },
        { name: "Watches", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop" },
        { name: "Jewellery", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop" },
        { name: "Sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop" },
        { name: "Hats", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop" },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-heading font-bold mb-6">Shop by Category</h2>
                {/* Horizontal Scroll for Mobile, Grid for Desktop */}
                <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-3 lg:grid-cols-9 md:overflow-hidden scrollbar-hide">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            to={`/home/accessories/${cat.name.toLowerCase().replace(/ /g, '-')}`}
                            className="group cursor-pointer min-w-[100px] flex-shrink-0 flex flex-col items-center"
                        >
                            <div className="aspect-square w-24 md:w-full rounded-full overflow-hidden mb-3 border border-transparent group-hover:border-brand-accent transition-all shadow-sm">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-center text-xs md:text-sm font-medium text-brand-charcoal group-hover:text-brand-accent transition-colors">{cat.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
