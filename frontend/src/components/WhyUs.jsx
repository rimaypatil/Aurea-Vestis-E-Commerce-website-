export default function WhyUs() {
    return (
        <section className="py-20 bg-brand-charcoal text-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-brand-accent tracking-widest text-sm font-bold uppercase mb-2 block">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                            Designed for <br />
                            <span className="italic font-serif text-brand-accent">Authentic Living</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            We believe fashion is more than just clothing—it's a form of self-expression.
                            At Aurea Vestis, we blend global trends with ethical sourcing and Indian sensibilities
                            to create premium everyday wear that empowers you to be unapologetically yourself.
                        </p>

                        <div className="flex flex-col space-y-4">
                            <div className="flex items-start">
                                <div className="w-12 h-px bg-brand-accent mt-3 mr-4"></div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1">Ethical Sourcing</h4>
                                    <p className="text-sm text-gray-400">Mindfully sourced fabrics supporting local artisans.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-12 h-px bg-brand-accent mt-3 mr-4"></div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1">Premium Comfort</h4>
                                    <p className="text-sm text-gray-400">Designed for the Indian climate and global lifestyle.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                alt="Lifestyle"
                                className="rounded-lg translate-y-8"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                                alt="Fabric"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
