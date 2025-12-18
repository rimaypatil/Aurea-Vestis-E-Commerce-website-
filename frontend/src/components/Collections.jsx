import { Link } from 'react-router-dom';
export default function Collections() {
    const collections = [
        { title: "New Arrivals", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80", size: "col-span-1 md:col-span-2 row-span-2", link: "/home/new" },
        { title: "Bestsellers", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", size: "col-span-1", link: "/home/bestseller" },
        { title: "Trending Now", image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800&auto=format&fit=crop", size: "col-span-1", link: "/home/trending" },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-charcoal mb-8">Featured Collections</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {collections.map((item, index) => (
                        <Link
                            key={index}
                            to={item.link}
                            className={`group relative overflow-hidden rounded-xl cursor-pointer ${item.size}`}
                        >
                            <div className="absolute inset-0 bg-gray-200">
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                ></div>
                            </div>
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>

                            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                                <h3 className="text-2xl font-bold font-heading mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{item.title}</h3>
                                <span className="text-sm font-medium border-b border-white inline-block w-max opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Explore Collection</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
