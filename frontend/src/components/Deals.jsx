import { Timer, Tag } from 'lucide-react';

export default function Deals() {
    const deals = [
        { title: "Deal of the Day", desc: "Flat 50% OFF on Streetwear", bg: "bg-orange-50", text: "text-orange-600" },
        { title: "Limited Time", desc: "Buy 1 Get 1 on Accessories", bg: "bg-blue-50", text: "text-blue-600" },
        { title: "Clearance", desc: "Up to 70% OFF | Last Sizes", bg: "bg-red-50", text: "text-red-600" },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-brand-accent" /> Don't Miss Out
                </h2>
                <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                    {deals.map((deal, idx) => (
                        <div key={idx} className={`min-w-[300px] flex-1 p-6 rounded-xl border border-dashed border-gray-200 ${deal.bg} flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow`}>
                            <div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${deal.text} mb-1 block`}>{deal.title}</span>
                                <p className="font-heading font-bold text-lg text-brand-charcoal">{deal.desc}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <Timer className={`w-5 h-5 ${deal.text}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
