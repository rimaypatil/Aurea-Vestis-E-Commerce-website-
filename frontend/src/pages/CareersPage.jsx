import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Users, Zap, Award, ChevronDown, ChevronUp } from 'lucide-react';

const CareersPage = () => {
    return (
        <section className="bg-brand-white min-h-screen font-body text-brand-charcoal">
            {/* Hero */}
            <div className="py-24 px-6 text-center border-b border-gray-100">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-4 inline-block">Join our team</span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                        Build the Future of <br /> Fashion With Us
                    </h1>
                    <p className="text-xl text-gray-500 max-w-xl mx-auto">
                        Where creativity meets purpose. Be part of a brand that defines modern luxury.
                    </p>
                </motion.div>
            </div>

            {/* Why Work With Us */}
            <div className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { icon: Zap, title: "Creative Freedom", desc: "We encourage bold ideas and experimentation." },
                        { icon: Award, title: "Growth Focused", desc: "Mentorship and resources to help you excel." },
                        { icon: Users, title: "Collaborative", desc: "Work with passionate, diverse, and talented minds." },
                        { icon: Briefcase, title: "Impactful Work", desc: "See your designs worn by thousands globally." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-black/10 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-charcoal group-hover:text-white transition-colors">
                                <item.icon size={20} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Current Openings */}
            <div className="bg-gray-50 py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-heading font-bold mb-4">Current Openings</h2>
                        <p className="text-gray-500">Find a role that fits your unique talents.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { role: "Senior Fashion Designer", type: "Design", loc: "Mumbai, India", desc: "Lead our seasonal collections with a focus on sustainable luxury fabrics." },
                            { role: "UI/UX Designer", type: "Tech", loc: "Remote", desc: "Craft seamless digital experiences for our global e-commerce platform." },
                            { role: "Brand Marketing Strategist", type: "Marketing", loc: "Bangalore, India", desc: "Shape our brand voice and lead innovative campaigns across social channels." },
                            { role: "Full Stack Developer (MERN)", type: "Tech", loc: "Remote", desc: "Build robust, scalable features for our fast-growing online store." }
                        ].map((job, index) => (
                            <JobAccordion key={index} job={job} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Culture Section */}
            <div className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-heading font-bold">A Culture of Innovation</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We don't just follow trends; we set them. Our workplace is built on inclusivity, respect, and a relentless pursuit of excellence. We value potential over pedigree and passion over polish.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Whether you are sketching designs, coding the next feature, or analyzing market data, your voice matters here.
                    </p>
                </div>
                <div className="relative h-80 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                    <span className="text-gray-400 font-heading text-xl">Team Visual / Office Shot</span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-charcoal/10 to-transparent"></div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-brand-charcoal text-white py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-heading font-bold mb-6">Don't see a role that fits?</h2>
                    <p className="text-gray-400 mb-8">
                        We are always on the lookout for exceptional talent. If you think you'd be a great fit, we want to hear from you.
                    </p>
                    <button className="bg-white text-brand-charcoal px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                        Send Your Resume <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

const JobAccordion = ({ job }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-brand-charcoal hover:shadow-md">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-6 cursor-pointer flex items-center justify-between"
            >
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 block">{job.type} • {job.loc}</span>
                    <h3 className="font-bold text-lg">{job.role}</h3>
                </div>
                <div className={`w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-gray-50' : 'bg-white'}`}>
                    <ChevronDown size={16} />
                </div>
            </div>

            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="p-6 pt-0 border-t border-gray-50 mt-2">
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        {job.desc}
                    </p>
                    <button className="text-sm font-bold border-b-2 border-black pb-0.5 hover:text-brand-accent hover:border-brand-accent transition-colors">
                        Apply Now
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default CareersPage;
