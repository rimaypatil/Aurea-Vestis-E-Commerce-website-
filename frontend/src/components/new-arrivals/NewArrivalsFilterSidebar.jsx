import { ChevronDown, Filter } from 'lucide-react';

export default function NewArrivalsFilterSidebar() {
    return (
        <aside className="w-64 flex-shrink-0 hidden lg:block pr-8 border-r border-gray-100 h-screen sticky top-24 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-lg flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</h3>
                <button className="text-xs text-brand-accent font-medium hover:underline">Clear All</button>
            </div>

            {['Category', 'Product Type', 'Size', 'Price Range', 'Color', 'Material', 'Availability'].map((filter, idx) => (
                <div key={idx} className="mb-6 border-b border-gray-100 pb-4 last:border-0">
                    <button className="flex items-center justify-between w-full text-sm font-medium text-brand-charcoal mb-3 group hover:text-brand-accent">
                        {filter}
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-brand-accent" />
                    </button>

                    <div className="space-y-2">
                        {filter === 'Category' ? (
                            ['Men', 'Women', 'Sneakers', 'Accessories'].map((opt, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input type="checkbox" id={`${filter}-${i}`} className="rounded border-gray-300 text-brand-charcoal focus:ring-brand-accent" />
                                    <label htmlFor={`${filter}-${i}`} className="text-sm text-gray-600">{opt}</label>
                                </div>
                            ))
                        ) : filter === 'Availability' ? (
                            ['In Stock', 'Limited Stock'].map((opt, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input type="checkbox" id={`${filter}-${i}`} className="rounded border-gray-300 text-brand-charcoal focus:ring-brand-accent" />
                                    <label htmlFor={`${filter}-${i}`} className="text-sm text-gray-600">{opt}</label>
                                </div>
                            ))
                        ) : (
                            ['Option 1', 'Option 2', 'Option 3'].map((opt, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input type="checkbox" id={`${filter}-${i}`} className="rounded border-gray-300 text-brand-charcoal focus:ring-brand-accent" />
                                    <label htmlFor={`${filter}-${i}`} className="text-sm text-gray-600">{opt}</label>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ))}
        </aside>
    );
}
