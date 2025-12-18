import { Link } from 'react-router-dom';

export default function SneakersCategories() {
    const categories = [
        { name: "Casual Sneakers", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop" },
        { name: "Streetwear", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=800&auto=format&fit=crop" },
        { name: "Running", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
        { name: "Training", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop" },
        { name: "High-Tops", image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=800&auto=format&fit=crop" },
        { name: "Low-Tops", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" },
        { name: "Chunky", image: "https://images.unsplash.com/photo-1597248881519-db089d3744a5?q=80&w=800&auto=format&fit=crop" },
        { name: "Sustainable", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=800&auto=format&fit=crop" },
        { name: "Limited Edition", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop" },
    ];

    const getSlug = (name) => name.toLowerCase().replace(/ /g, '-');

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-heading font-bold mb-6">Shop by Category</h2>
                {/* Horizontal Scroll for Mobile, Grid for Desktop */}
                <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-3 lg:grid-cols-9 md:overflow-hidden scrollbar-hide">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            to={`/home/sneakers/${getSlug(cat.name)}`}
                            className="group cursor-pointer min-w-[100px] flex-shrink-0 flex flex-col items-center"
                        >
                            <div className="aspect-square w-24 md:w-full rounded-full overflow-hidden mb-3 border border-transparent group-hover:border-brand-accent transition-all shadow-sm">
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
