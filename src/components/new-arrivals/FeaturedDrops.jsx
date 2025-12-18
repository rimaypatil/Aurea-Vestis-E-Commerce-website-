import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const drops = [
    {
        id: 1,
        title: "Urban Luxe",
        subtitle: "Men's Streetwear",
        image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop",
        link: "/home/men"
    },
    {
        id: 2,
        title: "Chic & Modern",
        subtitle: "Women's Collection",
        image: "https://images.unsplash.com/photo-1525845859779-54d477ff291f?q=80&w=800&auto=format&fit=crop",
        link: "/home/women"
    },
    {
        id: 3,
        title: "Kicks Lab",
        subtitle: "Latest Sneakers",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop",
        link: "/home/sneakers"
    },
    {
        id: 4,
        title: "Finishing Touches",
        subtitle: "Premium Accessories",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
        link: "/home/accessories"
    }
];

export default function FeaturedDrops() {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-heading font-black text-brand-charcoal uppercase tracking-tight">Featured Drops</h2>
                        <p className="text-gray-500 mt-2">Curated collections just for you.</p>
                    </div>
                </div>

                {/* Grid for Desktop, Snap Scroll for Mobile */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 lg:grid lg:grid-cols-4 lg:overflow-visible scrollbar-hide">
                    {drops.map((drop, idx) => (
                        <motion.div
                            key={drop.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="min-w-[280px] snap-center group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <Link to={drop.link} className="block w-full h-full">
                                <div className="absolute inset-0 bg-gray-200">
                                    <img
                                        src={drop.image}
                                        alt={drop.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-brand-accent font-bold text-xs uppercase tracking-widest mb-2">{drop.subtitle}</p>
                                    <h3 className="text-white text-2xl font-heading font-bold uppercase leading-none mb-4">{drop.title}</h3>
                                    <div className="flex items-center text-white/80 text-sm font-bold group-hover:text-white transition-colors">
                                        Shop Now <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
