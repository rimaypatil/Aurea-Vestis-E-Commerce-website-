import React from 'react';
import { Star, Heart, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import brandVisual from '../assets/brand_visual.png';

const AboutUsPage = () => {
    return (
        <section className="bg-brand-white min-h-screen font-body text-brand-charcoal overflow-hidden">
            {/* Hero Section */}
            <div className="relative py-32 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight">
                        Redefining Modern <br /> Indian Fashion
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                        Global aesthetics. Indian soul. Timeless design.
                    </p>
                </motion.div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-accent/5 via-transparent to-transparent -z-10"></div>
            </div>

            {/* Brand Story */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-heading font-bold">The Aurea Vestis Story</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                At Aurea Vestis, we believe that fashion is more than just clothing—it's a form of self-expression that transcends borders. Born from a desire to bridge the gap between traditional Indian craftsmanship and contemporary global trends, we are a brand for the modern individual.
                            </p>
                            <p>
                                Our journey began with a simple question: Why choose between comfort and style? We meticulously source the finest fabrics and collaborate with skilled artisans to create pieces that feel as good as they look.
                            </p>
                            <p>
                                We are not just selling clothes; we are curating a lifestyle. A lifestyle that values quality over quantity, sustainability over fast fashion, and individuality over conformity.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                            <img src={brandVisual} alt="Brand Visual" className="w-full h-full object-cover" />
                        </div>
                        {/* Abstract decorative element */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-charcoal text-white p-6 flex items-center justify-center rounded-br-3xl z-10">
                            <span className="font-heading font-bold text-xl leading-none">Est. <br /> 2025</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-heading font-bold mb-4">Our Core Values</h2>
                        <p className="text-gray-500">The pillars that define our existence.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Star, title: "Quality Craftsmanship", desc: "Every stitch counts. We ensure premium finish in every garment." },
                            { icon: ShieldCheck, title: "Ethical Production", desc: "Fair wages and safe working conditions for all our artisans." },
                            { icon: Zap, title: "Modern Design", desc: "Always ahead of the curve, blending trends with timeless appeal." },
                            { icon: Heart, title: "Customer First", desc: "Your experience is our priority. We listen, learn, and improve." },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-8 rounded-2xl border border-gray-50 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group bg-gray-50/50"
                            >
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon size={24} className="text-brand-charcoal" />
                                </div>
                                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vision / Mission */}
            <div className="py-24 px-6 bg-brand-charcoal text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-6">Our Vision</h2>
                        <p className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-12">
                            "To become the global face of modern Indian fashion, inspiring confidence through design."
                        </p>
                        <div className="w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
                    </motion.div>
                </div>
            </div>

            {/* Closing Statement */}
            <div className="py-32 text-center bg-gray-50">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-heading font-bold text-brand-charcoal"
                >
                    Aurea Vestis is not just fashion. <br /> It’s a statement.
                </motion.h2>
            </div>
        </section>
    );
};

export default AboutUsPage;
