import React from 'react';
import { Link } from 'react-router-dom';

const items = [
    { title: "NEW IN MEN", img: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TUVOJTIwRkFTSElPTnxlbnwwfHwwfHx8MA%3D%3D", link: "/men" },
    { title: "NEW IN WOMEN", img: "https://images.unsplash.com/photo-1525845859779-54d477ff291f?q=80&w=600&auto=format&fit=crop", link: "/women" },
    { title: "FRESH SNEAKERS", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600&auto=format&fit=crop", link: "/sneakers" },
    { title: "LATEST ACCESSORIES", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600&auto=format&fit=crop", link: "/accessories" },
    { title: "LIMITED EDITION", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop", link: "/sale" },
    { title: "TRENDING COLORS", img: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop", link: "/women" },
    { title: "SEASONAL PICKS", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop", link: "/new-arrivals" },
];

export default function MarqueeSection() {
    return (
        <section className="py-16 md:py-24 overflow-hidden bg-brand-white">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-charcoal">Explore What's New</h2>
            </div>

            <div className="relative flex w-full overflow-hidden group">
                {/* Track 1 */}
                <div className="flex animate-marquee gap-8 min-w-full shrink-0 items-center justify-around group-hover:[animation-play-state:paused] px-4">
                    {items.map((item, idx) => (
                        <Link to={item.link} key={`t1-${idx}`} className="group/card relative w-64 flex-shrink-0 block">
                            <div className="w-full h-80 overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" loading="lazy" />
                            </div>
                            <h3 className="mt-5 text-center font-heading font-bold text-sm tracking-widest uppercase text-brand-charcoal group-hover/card:text-brand-accent transition-colors">{item.title}</h3>
                        </Link>
                    ))}
                </div>
                {/* Track 2 (Duplicate) */}
                <div aria-hidden="true" className="flex animate-marquee gap-8 min-w-full shrink-0 items-center justify-around group-hover:[animation-play-state:paused] px-4">
                    {items.map((item, idx) => (
                        <Link to={item.link} key={`t2-${idx}`} className="group/card relative w-64 flex-shrink-0 block">
                            <div className="w-full h-80 overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" loading="lazy" />
                            </div>
                            <h3 className="mt-5 text-center font-heading font-bold text-sm tracking-widest uppercase text-brand-charcoal group-hover/card:text-brand-accent transition-colors">{item.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
