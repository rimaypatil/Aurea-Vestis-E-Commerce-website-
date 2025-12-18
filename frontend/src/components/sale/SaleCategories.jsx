import { useNavigate } from 'react-router-dom';

export default function SaleCategories() {
    const navigate = useNavigate();
    const saleCategories = [
        { title: "Up to 50% Off Men", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop", discount: "50% OFF", link: "/sale/men-50" },
        { title: "Up to 60% Off Women", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", discount: "60% OFF", link: "/sale/women-60" },
        { title: "Sneakers Starting ₹1999", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop", discount: "STEAL DEAL", link: "/sale/sneakers-starting-1999" },
        { title: "Accessories Under ₹999", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop", discount: "UNDER ₹999", link: "/sale/accessories-under-999" },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-heading font-black mb-6 uppercase text-brand-charcoal">Top Sale Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {saleCategories.map((cat, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate(cat.link)}
                            className="group relative h-64 overflow-hidden rounded-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
                        >
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded shadow-lg animate-pulse">
                                {cat.discount}
                            </div>
                            <div className="absolute bottom-6 left-6">
                                <h3 className="text-white text-xl font-bold font-heading uppercase leading-tight">{cat.title}</h3>
                                <button className="mt-3 text-white text-sm font-bold border-b border-red-500 pb-1 hover:text-red-400 transition-colors">
                                    Shop Now &rarr;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
