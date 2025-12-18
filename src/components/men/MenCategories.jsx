import { Link } from 'react-router-dom';

export default function MenCategories() {
    const categories = [
        { name: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop" },
        { name: "Shirts", image: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U0hJUlQlMjBJTiUyME1FTnxlbnwwfHwwfHx8MA%3D%3D" },
        { name: "Jeans", image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=800&auto=format&fit=crop" },
        { name: "Trousers", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop" },
        { name: "Jackets", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop" },
        { name: "Hoodies", image: "https://images.unsplash.com/photo-1680292783974-a9a336c10366?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SE9PRElFU3xlbnwwfHwwfHx8MA%3D%3D" },
        { name: "Sneakers", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=800&auto=format&fit=crop" },
        { name: "Accessories", image: "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V0FUQ0hFU3xlbnwwfHwwfHx8MA%3D%3D" },
        { name: "Suits", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop" },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-heading font-bold mb-6">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-4">
                    {categories.map((cat, idx) => (
                        <Link to={`/home/men/${cat.name.toLowerCase().replace(' ', '-')}`} key={idx} className="group cursor-pointer">
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
