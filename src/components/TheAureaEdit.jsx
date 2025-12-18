import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const curationItems = [
    {
        id: 1,
        title: "Everyday Essentials",
        subtitle: "Clean silhouettes for daily wear",
        link: "/everyday-essentials",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
        colSpan: "md:col-span-1"
    },
    {
        id: 2,
        title: "Street & Utility",
        subtitle: "Urban fits with attitude",
        link: "/street-and-utility",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1587&auto=format&fit=crop",
        colSpan: "md:col-span-1"
    },
    {
        id: 3,
        title: "Winter Collection",
        subtitle: "Layered looks, refined finishes",
        link: "/winter-collection",
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1587&auto=format&fit=crop",
        colSpan: "md:col-span-1"
    },
    {
        id: 4,
        title: "Comfort Outfit",
        subtitle: "Activewear designed to perform",
        link: "/comfort-outfit",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1620&auto=format&fit=crop",
        colSpan: "md:col-span-1"
    }
];

export default function TheAureaEdit() {
    return (
        <section className="py-24 bg-brand-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-heading font-bold text-brand-charcoal mb-3">The Aurea Edit</h2>
                    <p className="text-gray-500 text-lg">Curated moods. Elevated essentials. Modern silhouettes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px] md:h-[500px]">
                    {curationItems.map((item) => (
                        <Link
                            to={item.link}
                            key={item.id}
                            className={`group relative overflow-hidden rounded-lg ${item.colSpan}`}
                        >
                            <div className="absolute inset-0 bg-gray-200">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-accent transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                    {item.subtitle}
                                </p>
                                <div className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    Shop Now <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/home/trending" className="inline-flex items-center gap-2 text-brand-charcoal font-bold border-b-2 border-brand-accent pb-1 hover:text-brand-accent transition-colors">
                        Explore Collections <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
