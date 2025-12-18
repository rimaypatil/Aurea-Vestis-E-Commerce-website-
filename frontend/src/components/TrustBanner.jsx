import { ShieldCheck, Truck, RotateCcw, Smile } from 'lucide-react';

export default function TrustBanner() {
    const features = [
        { icon: Smile, text: "Over 50K+ Happy Customers", sub: "Join the community" },
        { icon: ShieldCheck, text: "Homegrown Indian Brand", sub: "Premium quality" },
        { icon: Truck, text: "Secure Payments", sub: "100% protected" },
        { icon: RotateCcw, text: "Easy Returns", sub: "7-day policy" },
    ];

    return (
        <section className="bg-brand-ivory py-8 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-4 justify-center md:justify-start">
                            <div className="p-3 bg-white rounded-full shadow-sm text-brand-accent">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-heading font-semibold text-brand-charcoal text-sm md:text-base">{feature.text}</h3>
                                <p className="text-xs text-gray-500 hidden md:block">{feature.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
