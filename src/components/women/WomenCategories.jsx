import { Link } from 'react-router-dom';

export default function WomenCategories() {
    const categories = [
        { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop" },
        { name: "Tops", image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=800&auto=format&fit=crop" },
        { name: "Ethnic Wear", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop" },
        { name: "Skirts", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop" },
        { name: "Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop" },
        { name: "Co-Ords", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=800&auto=format&fit=crop" },
        { name: "Activewear", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop" },
        { name: "Bags", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop" },
        { name: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop" },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-heading font-bold mb-6">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
                    {categories.map((cat, idx) => (
                        <Link to={`/home/women/${cat.name.toLowerCase().replace(/ /g, '-')}`} key={idx} className="group cursor-pointer">
                            <div className="aspect-square rounded-full overflow-hidden mb-3 border border-transparent group-hover:border-brand-accent transition-all shadow-sm">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-center text-sm font-medium text-brand-charcoal group-hover:text-brand-accent transition-colors">{cat.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
